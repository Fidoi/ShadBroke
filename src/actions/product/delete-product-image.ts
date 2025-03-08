'use server';

import { v2 as cloudinary } from 'cloudinary';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { auth } from '@/auth.config';

cloudinary.config(process.env.CLOUDINARY_URL ?? '');

const extractPublicId = (imageUrl: string) => {
  const parts = imageUrl.split('/');
  const uploadIndex = parts.findIndex((part) => part === 'upload');

  if (uploadIndex === -1) {
    throw new Error('Formato de URL de Cloudinary inválido');
  }

  const publicIdParts = parts.slice(uploadIndex + 1);

  if (/^v\d+/.test(publicIdParts[0])) {
    publicIdParts.shift();
  }

  return publicIdParts.join('/').split('.')[0];
};

export const deleteProductImage = async (imageId: number, imageUrl: string) => {
  const session = await auth();

  if (session?.user.role !== 'admin') {
    return {
      ok: false,
      error: 'Requiere permisos de administrador para eliminar imágenes',
    };
  }

  if (!imageUrl.startsWith('http')) {
    return {
      ok: false,
      error: 'No se pueden eliminar imagenes de FS',
    };
  }

  try {
    const publicId = extractPublicId(imageUrl);

    await cloudinary.uploader.destroy(publicId);

    const deletedImage = await prisma.productImage.delete({
      where: { id: imageId },
      select: {
        product: { select: { slug: true } },
      },
    });

    revalidatePath(`/profile/admin/products`);
    revalidatePath(`/profile/admin/product/${deletedImage.product.slug}`);
    revalidatePath(`/profile/product/${deletedImage.product.slug}`);

    return { ok: true };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: 'No se pudo eliminar la imagen',
    };
  }
};
