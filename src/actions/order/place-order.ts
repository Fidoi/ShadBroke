'use server';

import { auth } from '@/auth.config';
import type { Address, Size } from '@/interfaces';
import prisma from '@/lib/prisma';

interface ProductToOrder {
  productId: string;
  quantity: number;
  size: Size;
}

export const placeOrder = async (
  productIds: ProductToOrder[],
  address: Address
) => {
  const session = await auth();
  const userId = session?.user.id;
  if (!userId) {
    return {
      ok: false,
      message: 'No hay sesión de usuario',
    };
  }
  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds.map((p) => p.productId),
      },
    },
  });
  const itemsInOrder = productIds.reduce((count, p) => count + p.quantity, 0);

  const { subTotal, total } = productIds.reduce(
    (totals, item) => {
      const productQuantity = item.quantity;
      const product = products.find((product) => product.id === item.productId);

      if (!product) throw new Error(`${item.productId}, no existe - 500`);

      const subTotal = product.price * productQuantity;
      totals.subTotal += subTotal;
      totals.total += subTotal;

      return totals;
    },
    { subTotal: 0, total: 0 }
  );

  try {
    const prismaTx = await prisma.$transaction(async (tx) => {
      const existingUnpaidOrder = await tx.order.findFirst({
        where: {
          userId: userId,
          isPaid: false,
        },
        include: {
          OrderItem: true,
        },
      });

      if (existingUnpaidOrder) {
        const restoreStockPromises = existingUnpaidOrder.OrderItem.map((item) =>
          tx.product.update({
            where: { id: item.productId },
            data: { inStock: { increment: item.quantity } },
          })
        );

        await Promise.all(restoreStockPromises);
        await tx.orderAddress.deleteMany({
          where: { orderId: existingUnpaidOrder.id },
        });
        await tx.orderItem.deleteMany({
          where: { orderId: existingUnpaidOrder.id },
        });
        await tx.order.delete({
          where: { id: existingUnpaidOrder.id },
        });
      }
      const updatedProductsPromises = products.map((product) => {
        const productQuantity = productIds
          .filter((p) => p.productId === product.id)
          .reduce((acc, item) => item.quantity + acc, 0);
        if (productQuantity === 0) {
          throw new Error(`${product.id} no tiene cantidad definida`);
        }
        return tx.product.update({
          where: { id: product.id },
          data: {
            inStock: {
              decrement: productQuantity,
            },
          },
        });
      });
      const updatedProducts = await Promise.all(updatedProductsPromises);

      updatedProducts.forEach((product) => {
        if (product.inStock < 0) {
          throw new Error(
            `"${product.title}" no tiene inventario suficiente. `
          );
        }
      });
      const generatedOrderId =
        Date.now().toString().slice(-10) +
        Math.floor(Math.random() * 10000)
          .toString()
          .padStart(4, '0');

      const order = await tx.order.create({
        data: {
          id: generatedOrderId,
          userId: userId,
          itemsInOrder: itemsInOrder,
          subTotal: subTotal,
          total: total,
          OrderItem: {
            createMany: {
              data: productIds.map((p) => ({
                quantity: p.quantity,
                size: p.size,
                productId: p.productId,
                price:
                  products.find((product) => product.id === p.productId)
                    ?.price ?? 0,
              })),
            },
          },
        },
      });
      console.log(order);

      const orderAddress = await tx.orderAddress.create({
        data: {
          firstName: address.firstName,
          lastName: address.lastName,
          address: address.address,
          address2: address.address2,
          provinciaId: address.provincia.id,
          comunaId: address.comuna.id,
          regionId: address.region.id,
          phone: address.phone,
          orderId: order.id,
        },
      });

      return {
        updatedProduts: updatedProducts,
        order: order,
        orderAddress: orderAddress,
      };
    });
    return {
      ok: true,
      order: {
        id: prismaTx.order.id,
        total: total,
      },
      prismaTx: prismaTx,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(' Error en la transacción:', error);
    return {
      ok: false,
      message: error.message,
    };
  }
};
