'use server';

import prisma from '@/lib/prisma';

interface PaginationOptions {
  page?: number;
  take?: number;
}

export const getDiscountedProducts = async ({
  page = 1,
  take = 12,
}: PaginationOptions) => {
  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;

  try {
    const [products, totalCount] = await Promise.all([
      prisma.product.findMany({
        take,
        skip: (page - 1) * take,
        where: {
          discount: { gt: 0 },
        },
        include: {
          ProductImage: {
            take: 2,
            select: { url: true },
          },
        },
      }),
      prisma.product.count({
        where: {
          discount: { gt: 0 },
        },
      }),
    ]);

    const totalPages = Math.ceil(totalCount / take);

    return {
      currentPage: page,
      totalPages,
      products: products.map((product) => ({
        ...product,
        images: product.ProductImage.map((image) => image.url),
      })),
    };
  } catch (error) {
    throw new Error(`${error}`);
  }
};
