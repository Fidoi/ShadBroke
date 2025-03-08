'use server';

import prisma from '@/lib/prisma';
import { ProductWithImages } from '@/interfaces';

interface PaginationOptions {
  page?: number;
  take?: number;
  userId: string;
}

export const getUserFavorites = async ({
  page = 1,
  take = 12,
  userId,
}: PaginationOptions) => {
  try {
    if (isNaN(Number(page))) page = 1;
    if (page < 1) page = 1;

    const favorites = await prisma.favorite.findMany({
      where: { userId },
      include: {
        product: {
          include: {
            ProductImage: {
              take: 2,
              select: { url: true },
            },
          },
        },
      },
      take,
      skip: (page - 1) * take,
    });

    const products: ProductWithImages[] = favorites.map(({ product }) => ({
      ...product,
      images: product.ProductImage.map((image) => image.url),
    }));

    const totalCount = await prisma.favorite.count({
      where: { userId },
    });

    const totalPages = Math.ceil(totalCount / take);

    return {
      currentPage: page,
      totalPages,
      products,
      totalCount,
    };
  } catch (error) {
    console.log(error);
    throw new Error('Error al obtener favoritos');
  }
};
