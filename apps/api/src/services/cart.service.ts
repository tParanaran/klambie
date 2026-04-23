import {
  Adjustment,
  CartItems,
  CartItemsResponse,
  AddCart,
  InsertCart,
  CartItemIds,
} from '@/types/cart.types';
import { prisma } from '../../lib/prisma';
import { PromotionService } from './promotion.service';
import Decimal from 'decimal.js';
import { Cart } from '@generated/prisma/client';
import { ProductService } from './product.service';
import { ProductHelper } from '@/helpers/product.helper';

const promotionService = new PromotionService();
const productService = new ProductService();
const productHelper = new ProductHelper();

export class CartService {
  async checkAvailableStock(productVariantId: number): Promise<number> {
    const variant = await prisma.productVariant.findUnique({
      where: { id: productVariantId },
      select: { stock: true, reservedStock: true },
    });

    if (!variant) throw new Error('Product variant not found');

    const availableStock = variant.stock - variant.reservedStock;

    return availableStock;
  }
  async addOrUpdateCart(
    data: InsertCart,
    sessionId: string,
    userId?: number,
  ): Promise<AddCart> {
    const { productVariantId, quantity, unitPrice } = data;

    if (!userId && !sessionId)
      return {
        success: false,
        message: `Cannot add into your cart.`,
      };

    const availableStock = await this.checkAvailableStock(productVariantId);

    if (availableStock <= 0) {
      return {
        message: 'This item is out of stock',
        success: false,
      };
    }

    const newCart = await prisma.$transaction(async (tx) => {
      let cart;

      if (userId) {
        cart = await tx.cart.findFirst({ where: { userId } });

        if (!cart) {
          if (sessionId) {
            cart = await tx.cart.upsert({
              where: { sessionId },
              update: { userId, sessionId: null },
              create: { userId },
            });
          } else {
            cart = await tx.cart.create({ data: { userId } });
          }
        }
      } else {
        cart = await tx.cart.upsert({
          where: { sessionId },
          update: {},
          create: { sessionId },
        });
      }

      const existingItem = await tx.cartItem.findUnique({
        where: {
          cartId_productVariantId: { cartId: cart.id, productVariantId },
        },
      });

      if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;

        if (newQuantity > availableStock) {
          return {
            message: `Stock limit reached. Only ${availableStock} items are available.`,
            success: false,
          };
        }

        await tx.cartItem.update({
          where: {
            cartId_productVariantId: { cartId: cart.id, productVariantId },
          },
          data: { unitPrice, quantity: newQuantity },
        });
        return {
          message: `${quantity} item(s) added to your cart.`,
          addQuantity: quantity,
          success: true,
        };
      } else {
        await tx.cartItem.create({
          data: {
            cartId: cart.id,
            productVariantId,
            quantity: quantity,
            unitPrice,
          },
        });

        return {
          message: `${quantity} item(s) added to your cart.`,
          addQuantity: quantity,
          success: true,
        };
      }
    });

    return newCart;
  }
  async getCart(
    sessionId: string,
    userId?: number,
  ): Promise<{
    cart: Cart;
    cartItemIds: CartItemIds[];
  } | null> {
    if (!sessionId && !userId) return null;

    const cart = await prisma.cart.findUnique({
      where: userId ? { userId } : { sessionId },
      include: {
        cartItems: {
          include: {
            productVariant: {
              include: {
                product: true,
              },
            },
          },
        },
      },
    });

    if (!cart) return null;

    const validatedItems = await Promise.all(
      cart.cartItems.map(async (item) => {
        const { isActive, stock, reservedStock, product } = item.productVariant;

        const { inStock } = await productHelper.validateStock({
          status: product.status,
          isActive,
          stock,
          reservedStock,
        });

        return {
          ...item,
          inStock,
        };
      }),
    );
    const cartItemIds = validatedItems.map((item) => ({
      variantId: item.productVariantId,
      quantity: item.quantity,
      inStock: item.inStock,
    }));

    return { cart, cartItemIds };
  }
  async getTotalCart(
    sessionId: string,
    userId?: number,
  ): Promise<{ total: number } | null> {
    const cart = await this.getCart(sessionId, userId);

    if (!cart) return null;

    const total = cart.cartItemIds
      .filter((item) => item.inStock)
      .reduce((acc, item) => acc + item.quantity, 0);

    return { total };
  }
  async mergeCart(
    userId: number,
    sessionId: string,
  ): Promise<{ adjustments: Adjustment[] }> {
    if (!sessionId) return { adjustments: [] };

    const adjustments: Adjustment[] = [];

    await prisma.$transaction(async (tx) => {
      const guestCart = await tx.cart.findUnique({
        where: {
          sessionId,
        },
        include: {
          cartItems: true,
        },
      });

      if (!guestCart) return;

      const userCart = await tx.cart.findUnique({
        where: {
          userId,
        },
        include: {
          cartItems: true,
        },
      });

      if (!userCart) {
        await prisma.cart.update({
          where: { sessionId },
          data: {
            userId,
            sessionId: null,
          },
        });
        return;
      }

      for (const guestItems of guestCart.cartItems) {
        const availableStock = await this.checkAvailableStock(
          guestItems.productVariantId,
        );
        if (availableStock <= 0) {
          adjustments.push({
            productVariantId: guestItems.productVariantId,
            requested: guestItems.quantity,
            available: 0,
            final: 0,
            reason: 'out_of_stock',
          });
          continue;
        }

        const existingItem = userCart.cartItems.find(
          (item) => item.productVariantId === guestItems.productVariantId,
        );

        const userQty = existingItem?.quantity || 0;
        const requestQty = userQty + guestItems.quantity;
        const finalQty = Math.min(requestQty, availableStock);

        if (requestQty > availableStock) {
          adjustments.push({
            productVariantId: guestItems.productVariantId,
            requested: requestQty,
            available: availableStock,
            final: finalQty,
            reason: 'stock_limit',
          });
        }

        if (existingItem) {
          await tx.cartItem.update({
            where: { id: existingItem.id },
            data: {
              quantity: finalQty,
              unitPrice: existingItem.unitPrice,
            },
          });
        } else {
          await tx.cartItem.create({
            data: {
              cartId: userCart.id,
              productVariantId: guestItems.productVariantId,
              quantity: finalQty,
              unitPrice: guestItems.unitPrice,
            },
          });
        }
      }
      await tx.cart.delete({
        where: { id: guestCart.id },
      });
    });

    return { adjustments };
  }
  async calculatePrice(
    cartItemIds: CartItemIds[],
    sessionId: string,
    userId?: number,
  ): Promise<CartItemsResponse | null> {
    if (!sessionId && !userId) return null;

    const cartItems: CartItems[] = (
      await Promise.all(
        cartItemIds.map(async (item) => {
          const variant = await prisma.productVariant.findUnique({
            where: { id: item.variantId },
            include: {
              product: true,
              productVariantAttributes: {
                include: {
                  attributeValue: {
                    include: {
                      attribute: true,
                    },
                  },
                },
              },
            },
          });

          if (!variant) return null;

          const { isActive, product, stock, reservedStock } = variant;

          const { inStock, availableStock } = await productHelper.validateStock(
            {
              status: product.status,
              isActive,
              stock,
              reservedStock,
            },
          );

          const { slug } = variant.product;
          const [category, tag, brand, img] = await Promise.all([
            productService.getProductCategory(slug),
            productService.getProductTag(slug),
            productService.getBrand(slug),
            productService.getImages(slug),
          ]);

          const promoInput = {
            user: userId,
            product: {
              id: item.variantId,
              quantity: item.quantity,
              basePrice: variant.basePrice,
              brandId: brand?.brandId,
              categoriesId: category?.categoriesId,
              tagsId: tag?.tagsId,
            },
          };

          const promoCheckResult =
            await promotionService.promotionRuleCheck(promoInput);

          const price = new Decimal(variant.basePrice);
          const quantity = new Decimal(item.quantity);
          const subtotal = price.mul(quantity);
          const discount = promoCheckResult.hasDiscount
            ? new Decimal(promoCheckResult.price.discountApplied)
            : new Decimal(0);
          const totalPrice = subtotal.minus(discount);

          const variantAttributeValueIds = variant.productVariantAttributes.map(
            (a) => a.attributeValueId,
          );

          const imageUrl =
            img?.variantImages.find(
              (i) =>
                i.attributeId &&
                variantAttributeValueIds.includes(i.attributeId),
            )?.url ?? null;

          return {
            productVariantId: item.variantId,
            name: variant.product.name,
            appliedPromotions: promoCheckResult.appliedPromotion,
            hasDiscount: promoCheckResult.hasDiscount,
            price: {
              subtotal,
              discount,
              totalPrice,
            },
            sku: variant.sku ?? variant.product.sku,
            type: variant.product.type,
            image: imageUrl ? imageUrl : img?.images[0],
            quantity: item.quantity,
            slug: variant.product.slug,
            brand: brand?.brandName.name,
            availableStock,
            inStock,
            attributes: variant.productVariantAttributes.map((a) => ({
              attributeId: a.attributeValue.attributeId,
              attributeValueId: a.attributeValueId,
              attribute: a.attributeValue.attribute.name,
              value: a.attributeValue.value,
            })),
          };
        }),
      )
    ).filter((i): i is CartItems => i !== null);

    const availableItems = cartItems.filter((i) => i.inStock);
    const nonAvailableItems = cartItems.filter((i) => !i.inStock);

    const subTotal = availableItems.reduce(
      (sum, item) => sum.plus(item.price.subtotal),
      new Decimal(0),
    );

    const discountTotal = availableItems.reduce(
      (sum, item) => sum.plus(item.price.discount),
      new Decimal(0),
    );

    const grandTotal = availableItems.reduce(
      (sum, item) => sum.plus(item.price.totalPrice),
      new Decimal(0),
    );

    if (cartItems.length === 0) {
      return null;
    }

    return {
      cartItems: [availableItems, nonAvailableItems],
      totalPrice: {
        subTotal,
        discountTotal,
        grandTotal,
      },
    };
  }
  async getCartItems(
    sessionId: string,
    userId?: number,
  ): Promise<CartItemsResponse | null> {
    const cart = await this.getCart(sessionId, userId);

    if (!cart) return null;

    const { cartItemIds } = cart;

    const result = await this.calculatePrice(cartItemIds, sessionId, userId);

    if (!result) return null;

    const { cartItems, totalPrice } = result;

    return { cartItems, totalPrice };
  }
  async deleteCart(
    data: { productIds: number[] | number },
    sessionId: string,
    userId?: number,
  ): Promise<{ deleteItems: number; message: string; type: string }> {
    const cart = await this.getCart(sessionId, userId);

    if (!cart)
      return {
        deleteItems: 0,
        message: 'Items not found in cart',
        type: 'error',
      };

    const id = cart.cart.id;

    const { productIds } = data;

    const idsToDelete = Array.isArray(productIds) ? productIds : [productIds];

    const deleteResults = await Promise.all(
      idsToDelete.map((productVariantId) =>
        prisma.cartItem.deleteMany({
          where: {
            cartId: id,
            productVariantId,
          },
        }),
      ),
    );

    const totalDeleted = deleteResults.reduce(
      (sum, r) => sum + (r.count ?? 0),
      0,
    );

    const remainingItems = await prisma.cartItem.findMany({
      where: { cartId: id },
    });

    if (remainingItems.length === 0) {
      await prisma.cart.delete({
        where: { id },
      });
    }

    return {
      deleteItems: totalDeleted,
      message: `Deleted ${totalDeleted} items successfully`,
      type: 'success',
    };
  }
  async addUpdateQty(
    productId: number,
    quantity: number,
    sessionId: string,
    userId?: number,
  ): Promise<{ message: string; success: boolean; addQuantity?: number }> {
    const availableStock = await this.checkAvailableStock(productId);
    const cart = await this.getCart(sessionId, userId);

    if (!cart) {
      return {
        message: 'Item not found in cart',
        success: false,
      };
    }

    if (availableStock <= 0) {
      return {
        message: 'This item is out of stock',
        success: false,
      };
    }

    if (quantity > availableStock) {
      return {
        message: `Stock limit reached. Only ${availableStock} items are available.`,
        success: false,
      };
    }

    const result = await prisma.cartItem.update({
      where: {
        cartId_productVariantId: {
          cartId: cart.cart.id,
          productVariantId: productId,
        },
      },
      data: {
        quantity,
      },
    });

    if (!result) {
      return {
        message: 'Something go wrong',
        success: false,
      };
    }

    return {
      message: 'Quantity updated successfully.',
      addQuantity:
        quantity -
        cart.cartItemIds.find((c) => c.variantId === productId)?.quantity!,
      success: true,
    };
  }
  async changeVariant(
    productId: number,
    newProductId: number,
    quantity: number,
    sessionId: string,
    userId?: number,
  ): Promise<{ message: string; success: boolean; addQuantity?: number }> {
    const availableStock = await this.checkAvailableStock(newProductId);
    const cart = await this.getCart(sessionId, userId);

    if (!cart) {
      return {
        message: 'Item not found in cart',
        success: false,
      };
    }
    if (availableStock <= 0) {
      return {
        message: 'This item is out of stock',
        success: false,
      };
    }

    if (quantity > availableStock) {
      return {
        message: `Stock limited reached. Only ${availableStock} items are available.`,
        success: false,
      };
    }

    const existingItems = cart.cartItemIds.find(
      (c) => c.variantId === productId,
    );
    const newItems = cart.cartItemIds.find((c) => c.variantId === newProductId);

    if (!existingItems)
      return {
        message: 'Item not found in cart',
        success: false,
      };

    if (newItems) {
      return {
        message: 'This Item already exist in your cart',
        success: false,
      };
    }

    await prisma.cartItem.update({
      where: {
        cartId_productVariantId: {
          cartId: cart.cart.id,
          productVariantId: productId,
        },
      },
      data: {
        productVariantId: newProductId,
        quantity: quantity,
      },
    });

    return {
      message: `Change variant successfully. ${quantity} item(s) changed to your cart.`,
      addQuantity: quantity - existingItems.quantity,
      success: true,
    };
  }
}
