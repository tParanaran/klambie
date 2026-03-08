import {
  Adjustment,
  CartItems,
  CartItemsResponse,
  AddCart,
  InsertCart,
} from '@/types/cart.types';
import { prisma } from 'lib/prisma';
import { PromotionService } from './promotion.service';
import Decimal from 'decimal.js';
import { Cart, CartItem } from 'generated/prisma/client';
import { ProductService } from './product.service';

const promotionService = new PromotionService();
const productService = new ProductService();

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
      throw new Error('Cannot add to cart no session provided');

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
  ): Promise<{ cart: Cart; cartItems: CartItem[] } | null> {
    if (!sessionId && !userId) return null;
    let cart;

    if (userId) {
      cart = await prisma.cart.findUnique({
        where: { userId },
        include: {
          cartItems: true,
        },
      });
    } else {
      cart = await prisma.cart.findUnique({
        where: { sessionId },
        include: {
          cartItems: true,
        },
      });
    }
    if (!cart) return null;

    return { cart: cart, cartItems: cart.cartItems };
  }
  async getTotalCart(
    sessionId: string,
    userId?: number,
  ): Promise<{ total: number } | null> {
    const cart = await this.getCart(sessionId, userId);

    if (!cart) return null;

    const total = cart.cartItems.reduce((acc, item) => acc + item.quantity, 0);

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
  async getCartItems(
    sessionId: string,
    userId?: number,
  ): Promise<CartItemsResponse | null> {
    const cart = await this.getCart(sessionId, userId);

    if (!cart) return null;

    const cartItems: CartItems[] = (
      await Promise.all(
        cart.cartItems.map(async (item) => {
          const variant = await prisma.productVariant.findUnique({
            where: { id: item.productVariantId },
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
              id: item.productVariantId,
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

          const stockAvailable = variant.stock - variant.reservedStock;
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
            cartItemId: item.cartId,
            productVariantId: item.productVariantId,
            name: variant.product.name,
            appliedPromotions: promoCheckResult.appliedPromotion,
            hasDiscount: promoCheckResult.hasDiscount,
            price: {
              subtotal,
              discount,
              totalPrice,
            },
            sku: variant.sku,
            image: imageUrl ? imageUrl : img?.images[0],
            quantity: item.quantity,
            slug: variant.product.slug,
            brand: brand?.brandName.name,
            stockAvailable,
            inStock: stockAvailable > 0,
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

    const subTotal = cartItems.reduce(
      (sum, item) => sum.plus(item.price.subtotal),
      new Decimal(0),
    );

    const discountTotal = cartItems.reduce(
      (sum, item) => sum.plus(item.price.discount),
      new Decimal(0),
    );

    const grandTotal = cartItems.reduce(
      (sum, item) => sum.plus(item.price.totalPrice),
      new Decimal(0),
    );

    if (cartItems.length === 0) {
      return null;
    }

    return {
      cartItems,
      totalPrice: {
        subTotal,
        discountTotal,
        grandTotal,
      },
    };
  }
  async deleteCart(
    productId: number,
    sessionId: string,
    userId?: number,
  ): Promise<void> {
    const cart = await this.getCart(sessionId, userId);

    if (!cart) return;

    const { id } = cart.cart;

    await prisma.cartItem.delete({
      where: {
        cartId_productVariantId: {
          cartId: id,
          productVariantId: productId,
        },
      },
    });

    const emptyCart = await prisma.cartItem.findMany({
      where: {
        cartId: id,
      },
    });

    if (emptyCart.length === 0) {
      await prisma.cart.delete({
        where: { id: id },
      });
    }
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
        cart.cartItems.find((c) => c.productVariantId === productId)?.quantity!,
      success: true,
    };
  }
}
