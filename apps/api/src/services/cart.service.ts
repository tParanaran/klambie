import {
  Adjustment,
  CartItems,
  CartItemsResponse,
  AddCart,
  InsertCart,
} from '@/types/cart.types';
import FlattenCategories from '@/utils/categories';
import { prisma } from 'lib/prisma';
import { PromotionService } from './promotion.service';
import Decimal from 'decimal.js';

const promotionService = new PromotionService();

export class CartService {
  async addOrUpdateCart(
    data: InsertCart,
    sessionId: string,
    userId?: number,
  ): Promise<AddCart> {
    const { productVariantId, quantity, unitPrice } = data;

    if (!userId && !sessionId)
      throw new Error('Cannot add to cart no session provided');

    const variant = await prisma.productVariant.findUnique({
      where: { id: productVariantId },
      select: { stock: true },
    });

    if (!variant) throw new Error('Product variant not found');

    if (variant.stock <= 0) {
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

        if (newQuantity > variant.stock) {
          return {
            message: `Cannot add more than ${variant.stock} items to the cart. Only ${variant.stock} items available.`,
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
          message: `Add ${quantity} items to the cart.`,
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
          message: `Add ${quantity} items to the cart.`,
          addQuantity: quantity,
          success: true,
        };
      }
    });

    return newCart;
  }
  async getTotalCart(
    sessionId: string,
    userId?: number,
  ): Promise<{ total: number } | null> {
    if (!sessionId && !userId) return null;
    let cart;

    if (userId) {
      cart = await prisma.cart.findFirst({
        where: { userId },
      });
    } else {
      cart = await prisma.cart.findFirst({
        where: { sessionId },
      });
    }

    if (!cart) return null;

    const cartItems = await prisma.cartItem.findMany({
      where: {
        cartId: cart.id,
      },
    });

    const total = cartItems.reduce((acc, item) => acc + item.quantity, 0);

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
        const variant = await tx.productVariant.findUnique({
          where: { id: guestItems.productVariantId },
        });
        if (!variant || variant.stock <= 0) {
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
        const finalQty = Math.min(requestQty, variant.stock);

        if (requestQty > variant.stock) {
          adjustments.push({
            productVariantId: guestItems.productVariantId,
            requested: requestQty,
            available: variant.stock,
            final: finalQty,
            reason: 'stock_limit',
          });
        }

        if (existingItem) {
          await tx.cartItem.update({
            where: { id: existingItem.id },
            data: {
              quantity: finalQty,
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
  async getCart(
    sessionId: string,
    userId?: number,
  ): Promise<CartItemsResponse | null> {
    if (!sessionId && !userId) return null;

    let cart;

    if (userId) {
      cart = await prisma.cart.findUnique({
        where: { userId: userId },
      });
    } else {
      cart = await prisma.cart.findFirst({
        where: { sessionId: sessionId },
      });
    }

    if (!cart) return null;

    const carts = await prisma.cartItem.findMany({
      where: {
        cartId: cart.id,
      },
      include: {
        productVariant: {
          include: {
            productVariantAttributes: {
              include: {
                attributeValue: {
                  include: {
                    attribute: true,
                  },
                },
              },
            },
            product: {
              include: {
                productTags: true,
                images: true,
                brand: true,
                productCategories: {
                  select: {
                    categoryHierarchy: {
                      select: {
                        category: { select: { id: true } },
                        parent: {
                          select: {
                            category: { select: { id: true } },
                            parent: {
                              select: {
                                category: { select: { id: true } },
                                parent: {
                                  select: {
                                    category: { select: { id: true } },
                                  },
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    const promoInputs = carts.map((item) => ({
      user: userId ? userId : 0,
      product: {
        id: item.productVariantId,
        quantity: item.quantity,
        basePrice: item.productVariant.basePrice,
        brandId: item.productVariant.product.brandId,
        categoriesId: [
          ...new Set(
            item.productVariant.product.productCategories.flatMap(
              (pc) => FlattenCategories(pc.categoryHierarchy).categoriesId,
            ),
          ),
        ],
        tagsId: [
          ...new Set(
            item.productVariant.product.productTags
              .map((t) => t.tagId)
              .filter(Boolean),
          ),
        ],
      },
    }));

    const cartItems: CartItems[] = (
      await Promise.all(
        promoInputs.map(async (promoInput) => {
          const promotionResult =
            await promotionService.promotionRuleCheck(promoInput);
          const product = carts.find(
            (p) => p.productVariantId === promoInput.product.id,
          );

          if (!product) return null;

          const price = new Decimal(product.productVariant.basePrice);
          const quantity = new Decimal(promoInput.product.quantity);

          const subtotal = price.mul(quantity);

          const discount = promotionResult.hasDiscount
            ? new Decimal(promotionResult.price.discountApplied)
            : new Decimal(0);

          const totalPrice = subtotal.minus(discount);

          const variantAttributeValueIds =
            product.productVariant.productVariantAttributes.map(
              (a) => a.attributeValueId,
            );

          const imageUrl =
            product.productVariant.product.images.find(
              (img) =>
                img.attributeValueId !== null &&
                variantAttributeValueIds.includes(img.attributeValueId),
            )?.url ?? null;

          const stockAvailable =
            product.productVariant.stock - product.productVariant.reservedStock;
          return {
            cartItemId: product.cartId,
            productVariantId: product.productVariantId,
            name: product.productVariant.product.name,
            appliedPromotions: promotionResult.appliedPromotion,
            hasDiscount: promotionResult.hasDiscount,
            price: {
              subtotal,
              discount,
              totalPrice,
            },
            sku: product.productVariant.sku,
            image: imageUrl
              ? imageUrl
              : product.productVariant.product.images[0].url,
            quantity: promoInput.product.quantity,
            slug: product.productVariant.product.slug,
            brand: product.productVariant.product.brand.name,
            stockAvailable,
            inStock: stockAvailable > 0,
            attributes: product.productVariant.productVariantAttributes.map(
              (a) => ({
                attributeId: a.attributeValue.id,
                attribute: a.attributeValue.attribute.name,
                value: a.attributeValue.value,
              }),
            ),
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
    if (!sessionId && !userId) return;

    let cart;

    if (userId) {
      cart = await prisma.cart.findUnique({
        where: { userId: userId },
      });
    } else {
      cart = await prisma.cart.findFirst({
        where: { sessionId: sessionId },
      });
    }

    if (!cart) return;

    await prisma.cartItem.delete({
      where: {
        cartId_productVariantId: {
          cartId: cart.id,
          productVariantId: productId,
        },
      },
    });

    const emptyCart = await prisma.cartItem.findMany({
      where: {
        cartId: cart.id,
      },
    });

    if (emptyCart.length === 0) {
      await prisma.cart.delete({
        where: { id: cart.id },
      });
    }
  }
}
