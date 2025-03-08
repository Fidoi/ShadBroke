import { z } from 'zod';

const sizeEnum = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'] as const;

export const ProductSchema = z.object({
  id: z.string().optional().nullable(),
  title: z.string().min(1, 'El título es requerido'),
  slug: z.string().min(1, 'El slug es requerido'),
  description: z.string().min(1, 'La descripción es requerida'),
  price: z.coerce.number().min(0, 'El precio debe ser mayor o igual a 0'),
  inStock: z.coerce.number().min(0, 'El inventario debe ser mayor o igual a 0'),
  sizes: z
    .array(z.enum(sizeEnum))
    .min(1, 'Debes seleccionar al menos una talla'),
  colors: z
    .array(
      z
        .string()
        .regex(
          /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
          'Formato de color inválido'
        )
    )
    .min(1, 'Debes seleccionar al menos un color'),
  tags: z.string().min(1, 'Los tags son requeridos'),
  gender: z.enum(['men', 'women', 'kid', 'unisex']),
  categoryId: z.string().min(1, 'La categoría es requerida'),
  images: z.any().optional(),
  discount: z.coerce.number().min(0).max(100).optional().nullable(),
  discountEnd: z.string().nullable().optional(),
});

export type ProductFormInputs = z.infer<typeof ProductSchema>;
