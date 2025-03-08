'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';

export async function toggleFavoritesProducts(productId: string) {
  const session = await auth();
  if (!session?.user) {
    throw new Error('Usuario no autenticado');
  }

  const existingFavorite = await prisma.favorite.findUnique({
    where: {
      userId_productId: {
        userId: session.user.id,
        productId: productId,
      },
    },
  });

  if (existingFavorite) {
    await prisma.favorite.delete({
      where: {
        userId_productId: {
          userId: session.user.id,
          productId: productId,
        },
      },
    });
    return { favorited: false };
  } else {
    await prisma.favorite.create({
      data: {
        userId: session.user.id,
        productId: productId,
      },
    });
    return { favorited: true };
  }
}

export async function isProductFavorited(productId: string): Promise<boolean> {
  const session = await auth();
  if (!session?.user) {
    return false;
  }

  const favorite = await prisma.favorite.findUnique({
    where: {
      userId_productId: {
        userId: session.user.id,
        productId: productId,
      },
    },
  });

  return Boolean(favorite);
}
