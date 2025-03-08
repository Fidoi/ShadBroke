'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getReviewsByProductId(productId: string) {
  try {
    return await prisma.review.findMany({
      where: { productId },
      include: { user: { select: { name: true, image: true } } },
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return [];
  }
}

export async function createReview(
  productId: string,
  rating: number,
  comment: string
) {
  const session = await auth();
  if (!session?.user) throw new Error('Debes iniciar sesión');

  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
      select: { slug: true },
    });

    const newReview = await prisma.review.create({
      data: {
        rating,
        comment,
        productId,
        userId: session.user.id,
      },
    });

    revalidatePath(`/products/${product?.slug}`);
    return newReview;
  } catch (error) {
    console.error('Error creating review:', error);
    throw new Error('Error al crear reseña');
  }
}
export async function deleteReview(reviewId: string) {
  const session = await auth();

  if (!session?.user || session.user.role !== 'admin') {
    throw new Error('No tienes permisos para esta acción');
  }

  try {
    await prisma.review.delete({
      where: { id: reviewId },
    });

    revalidatePath('/products/[slug]');
    return { success: true };
  } catch (error) {
    console.error('Error deleting review:', error);
    throw new Error('Error al eliminar la reseña');
  }
}
