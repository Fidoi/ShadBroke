'use server';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { v2 as cloudinary } from 'cloudinary';
import { Product } from '@/interfaces';
import { ProductSchema } from '@/schemas';
import { auth } from '@/auth.config';

cloudinary.config(process.env.CLOUDINARY_URL ?? '');

export const createUpdateProduct = async (formData: FormData) => {
  const session = await auth();
  if (session?.user.role !== 'admin') {
    return {
      ok: false,
      error: 'Requiere permisos de administrador',
    };
  }
  try {
    const data = {
      id: formData.get('id') || undefined,
      title: formData.get('title'),
      slug: formData.get('slug'),
      description: formData.get('description'),
      price: Number(formData.get('price')),
      inStock: Number(formData.get('inStock')),
      sizes: formData.getAll('sizes') as string[],
      tags: formData.get('tags'),
      gender: formData.get('gender'),
      categoryId: formData.get('categoryId'),
      discount: formData.get('discount')
        ? Number(formData.get('discount'))
        : null,
      discountEnd: formData.get('discountEnd'),
      images: formData.getAll('images'),
      colors: formData.getAll('colors') as string[],
    };

    const result = ProductSchema.safeParse(data);

    if (!result.success) {
      return {
        ok: false,
        error: result.error.issues.map((issue) => ({
          path: issue.path.join('.'),
          message: issue.message,
        })),
      };
    }

    const productData = result.data;
    productData.slug = productData.slug.toLowerCase().replace(/ /g, '-').trim();

    const prismaTx = await prisma.$transaction(async (tx) => {
      let product: Product;
      const tagsArray = productData.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag !== '');

      const baseData = {
        title: productData.title,
        slug: productData.slug,
        description: productData.description,
        price: productData.price,
        inStock: productData.inStock,
        sizes: productData.sizes,
        tags: tagsArray,
        colors: productData.colors,
        gender: productData.gender,
        categoryId: productData.categoryId,
        discount: productData.discount,
        discountEnd: productData.discountEnd
          ? new Date(productData.discountEnd)
          : null,
      };

      if (productData.id) {
        product = await tx.product.update({
          where: { id: productData.id },
          data: baseData,
        });
      } else {
        product = await tx.product.create({
          data: baseData,
        });
      }

      if (data.images && data.images.length > 0) {
        const images = await uploadImages(data.images as File[]);

        if (images.length > 0) {
          await tx.productImage.createMany({
            data: images.map((url) => ({
              url,
              productId: product.id,
            })),
          });
        }
      }

      return product;
    });

    revalidatePaths(productData.slug);

    return {
      ok: true,
      product: prismaTx,
    };
  } catch (error) {
    console.error(error);

    return {
      ok: false,
      message: 'Error al procesar la solicitud',
    };
  }
};

const uploadImages = async (images: File[]): Promise<string[]> => {
  const uploadPromises = images.map(async (image) => {
    try {
      const buffer = await image.arrayBuffer();
      const base64Image = Buffer.from(buffer).toString('base64');
      const result = await cloudinary.uploader.upload(
        `data:${image.type};base64,${base64Image}`,
        { folder: 'ShadBroke/productos' }
      );
      return result.secure_url;
    } catch (error) {
      console.error(error);
      return null;
    }
  });

  const results = await Promise.all(uploadPromises);
  return results.filter((url) => url !== null) as string[];
};

const revalidatePaths = (slug: string) => {
  revalidatePath('/admin/products');
  revalidatePath(`/admin/product/${slug}`);
  revalidatePath(`/products/${slug}`);
};
