'use server';

import { revalidatePath } from 'next/cache';
import { v2 as cloudinary } from 'cloudinary';
import prisma from '@/lib/prisma';
import { auth } from '@/auth.config';

cloudinary.config(process.env.CLOUDINARY_URL ?? '');

export const deleteProduct = async (productId: string) => {
  const session = await auth();

  if (session?.user.role !== 'admin') {
    return {
      ok: false,
      message: 'Requiere permisos de administrador',
    };
  }
  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: { ProductImage: true, OrderItem: true },
    });

    if (!product) {
      console.error('Producto no encontrado');
      return { ok: false, message: 'Producto no encontrado' };
    }

    await Promise.all(
      product.ProductImage.map(async (image) => {
        if (!image.url.includes('/upload/')) {
          console.warn(`URL no válida para imagen: ${image.url}`);
          return { success: false, url: image.url, message: 'URL inválida' };
        }

        const parts = image.url.split('/upload/');
        if (parts.length < 2) {
          console.error(`No se pudo dividir la URL: ${image.url}`);
          return {
            success: false,
            url: image.url,
            message: 'Formato de URL inesperado',
          };
        }
        const publicIdWithExtension = parts[1];
        const publicIdRaw = publicIdWithExtension.split('.')[0];
        const publicId = publicIdRaw.replace(/^v\d+\//, '');

        try {
          const result = await cloudinary.uploader.destroy(publicId, {
            invalidate: true,
          });
          if (result.result !== 'ok' && result.result !== 'not found') {
            console.error(
              `Cloudinary no eliminó la imagen ${publicId}:`,
              result
            );
          }
          return { success: true, publicId, result };
        } catch (error) {
          console.error(`Error al eliminar imagen ${publicId}:`, error);
          return { success: false, publicId, error };
        }
      })
    );

    await prisma.product.delete({
      where: { id: productId },
    });

    revalidatePath('/profile/admin/products');
    revalidatePath(`/profile/admin/product/${product.slug}`);

    return { ok: true, message: 'Producto eliminado correctamente' };
  } catch (error) {
    console.error('Error en deleteProduct:', error);
    return { ok: false, message: 'Error al eliminar el producto' };
  }
};
