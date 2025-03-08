'use server';

import prisma from '@/lib/prisma';

export const getProductsByTitle = async (title: string) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        ProductImage: {
          select: { url: true },
        },
      },
      where: {
        title: {
          contains: title,
          mode: 'insensitive',
        },
      },
      take: 5,
    });

    return products.map((product) => ({
      ...product,
      images: product.ProductImage.map((image) => image.url),
    }));
  } catch (error) {
    console.log(error);
    throw new Error('Error al obtener productos');
  }
};
