'use server';

import prisma from '@/lib/prisma';
import { Gender } from '@prisma/client';

interface PaginationOptions {
  page?: number;
  take?: number;
  category?: string;
  gender?: Gender;
}

export const getPaginatedProductsWithImages = async ({
  page = 1,
  take = 12,
  category,
  gender,
}: PaginationOptions) => {
  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;

  const filter: Record<string, unknown> = {};
  if (category) {
    filter.tags = { has: category };
  }

  if (gender) {
    filter.gender = gender;
  }

  try {
    const products = await prisma.product.findMany({
      take,
      skip: (page - 1) * take,
      include: { ProductImage: { take: 2, select: { url: true } } },
      where: filter,
    });

    const totalCount = await prisma.product.count({
      where: filter,
    });
    const totalPages = Math.ceil(totalCount / take);

    return {
      currentPage: page,
      totalPages,
      totalCount,
      products: products.map((product) => ({
        ...product,
        images: product.ProductImage.map((image) => image.url),
      })),
    };
  } catch (error) {
    throw new Error(`${error}`);
  }
};
