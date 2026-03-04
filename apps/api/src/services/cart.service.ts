import { CartResponse, InsertCart } from '@/types/cart.types';
import { prisma } from 'lib/prisma';

export class CartService {
  async addOrUpdateCart(
    data: InsertCart,
    userId?: number,
    sessionId?: string,
  ): Promise<CartResponse> {
    const { productVariantId, quantity, unitPrice } = data;

    if (!userId && !sessionId)
      throw new Error('Cannot add to cart, please login first');

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
  async getCart(
    userId?: number,
    sessionId?: string,
  ): Promise<{ total: number }> {
    const cart = await prisma.cart.findFirst({
      where: {
        sessionId: sessionId ?? undefined,
        userId: userId ?? undefined,
      },
    });

    if (!cart) {
      return {
        total: 0,
      };
    }

    const cartItems = await prisma.cartItem.findMany({
      where: {
        cartId: cart.id,
      },
      include: {
        productVariant: {
          include: {
            product: true,
          },
        },
      },
    });

    const total = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    return { total };
  }
}
