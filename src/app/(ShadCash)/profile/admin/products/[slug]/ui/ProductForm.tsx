'use client';

import {
  Category,
  Product,
  ProductImage as ProductWithImage,
  Size,
} from '@/interfaces';
import { format } from 'date-fns';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useRouter } from 'next/navigation';

import { createUpdateProduct, deleteProductImage } from '@/actions';
import {
  AlertModal,
  Calendar,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ProductImage,
} from '@/components';
import { ProductSchema } from '@/schemas';
import { useToast } from '@/hooks/use-toast';
import { CalendarIcon, CheckCircle, CircleX, Trash } from 'lucide-react';
import { ColorsInput } from './ColorSelector';
import { ProductFormInputs } from '@/schemas';
import { cn } from '@/lib/utils';

interface Props {
  product: Partial<Product> & { ProductImage?: ProductWithImage[] };
  categories: Category[];
}

type FormInputs = ProductFormInputs & {
  images?: FileList;
};

const sizes: Size[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

export const ProductForm = ({ product, categories }: Props) => {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<FormInputs>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      title: product.title ?? '',
      slug: product.slug ?? '',
      description: product.description ?? '',
      price: product.price ?? 0,
      inStock: product.inStock ?? 0,
      sizes: product.sizes ?? [],
      colors: product.colors?.map((c) => c.toUpperCase()) ?? [],
      tags: product.tags?.join(', ') ?? '',
      gender: product.gender ?? 'men',
      categoryId: product.categoryId ?? '',
      images: undefined,
      discount: product.discount ?? undefined,
      discountEnd: product.discountEnd
        ? format(new Date(product.discountEnd), 'yyyy-MM-dd')
        : '',
    },
  });

  const onSubmit = async (data: FormInputs) => {
    try {
      const formData = new FormData();
      const { images, ...productToSave } = data;

      if (product.id) formData.append('id', product.id);

      formData.append('title', productToSave.title);
      formData.append('slug', productToSave.slug);
      formData.append('description', productToSave.description);
      formData.append('price', productToSave.price.toString());
      formData.append('inStock', productToSave.inStock.toString());
      productToSave.sizes.forEach((size) => {
        formData.append('sizes', size);
      });
      productToSave.colors.forEach((color) => {
        formData.append('colors', color);
      });
      formData.append('tags', productToSave.tags);
      formData.append('categoryId', productToSave.categoryId);
      formData.append('gender', productToSave.gender);
      formData.append(
        'discount',
        productToSave.discount != null ? productToSave.discount.toString() : ''
      );

      formData.append(
        'discountEnd',
        productToSave.discountEnd
          ? new Date(productToSave.discountEnd).toISOString()
          : ''
      );

      if (images) {
        (Array.from(images) as File[]).forEach((file) => {
          formData.append('images', file);
        });
      }

      const {
        ok,
        product: updatedProduct,
        error,
      } = await createUpdateProduct(formData);
      if (error === 'Requiere permisos de administrador') {
        toast({
          variant: 'destructive',
          title: (
            <div className='flex items-center gap-2'>
              <CircleX className='h-5 w-5' />
              <span>Error de permisos : </span>
            </div>
          ) as unknown as string,
          description: 'Solo los administradores pueden modificar productos',
        });
        return;
      }
      if (!ok) {
        toast({
          variant: 'destructive',
          title: (
            <div className='flex items-center gap-2'>
              <CircleX className='h-5 w-5' />
              <span>Error al guardar el producto</span>
            </div>
          ) as unknown as string,
          description: `No se pudo actualizar el producto, verifica los datos ${error}`,
        });

        return;
      }
      toast({
        title: (
          <div className='flex items-center gap-2'>
            <CheckCircle className='h-5 w-5' />
            <span>Producto guardado : </span>
          </div>
        ) as unknown as string,
        className: 'toast-success',
        description: 'El producto se actualizó correctamente',
      });
      router.replace(`/profile/admin/products/${updatedProduct?.slug}`);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: (
          <div className='flex items-center gap-2'>
            <CircleX className='h-5 w-5' />
            <span>Error inesperado :</span>
          </div>
        ) as unknown as string,
        description: `${error}`,
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='grid gap-4 md:grid-cols-2 px-4'
      >
        <div className='space-y-4'>
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título</FormLabel>
                <FormControl>
                  <Input placeholder='Nombre del producto' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='slug'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input placeholder='slug-del-producto' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripción</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Descripción completa del producto'
                    className='min-h-[120px]'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='price'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Precio</FormLabel>
                <FormControl>
                  <Input type='number' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='tags'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <Input placeholder='tag1, tag2, tag3' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='gender'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Género</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Selecciona un género' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='men'>Men</SelectItem>
                    <SelectItem value='women'>Women</SelectItem>
                    <SelectItem value='kid'>Kid</SelectItem>
                    <SelectItem value='unisex'>Unisex</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='categoryId'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoría</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Selecciona una categoría' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <ScrollArea className='h-48'>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </ScrollArea>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' className='w-full'>
            Guardar producto
          </Button>
        </div>

        <div className='space-y-4'>
          <FormField
            control={form.control}
            name='discount'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descuento (%)</FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    min='0'
                    step='0.01'
                    placeholder='Ej: 15.5'
                    {...field}
                    value={field.value ?? ''}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='discountEnd'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel>Fin de descuento</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? (
                          format(new Date(field.value), 'PPP')
                        ) : (
                          <span>Selecciona una fecha</span>
                        )}
                        <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0' align='start'>
                    <Calendar
                      mode='single'
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={(date) =>
                        field.onChange(date ? format(date, 'yyyy-MM-dd') : '')
                      }
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='inStock'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Inventario</FormLabel>
                <FormControl>
                  <Input type='number' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='sizes'
            render={() => (
              <FormItem>
                <FormLabel>Tallas disponibles</FormLabel>
                <div className='flex flex-wrap gap-2'>
                  {sizes.map((size) => (
                    <Button
                      key={size}
                      type='button'
                      variant={
                        form.watch('sizes')?.includes(size)
                          ? 'default'
                          : 'outline'
                      }
                      onClick={() => {
                        const sizes = new Set(form.getValues('sizes'));
                        if (sizes.has(size)) {
                          sizes.delete(size);
                        } else {
                          sizes.add(size);
                        }
                        form.setValue('sizes', Array.from(sizes));
                      }}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='colors'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Colores</FormLabel>
                <FormControl>
                  <ColorsInput field={field} form={form} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='images'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Imágenes del producto</FormLabel>
                <FormControl>
                  <Input
                    type='file'
                    multiple
                    accept='image/png, image/jpeg, image/avif'
                    onChange={(e) => field.onChange(e.target.files)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='grid grid-cols-3 gap-4'>
            {product.ProductImage?.map((image) => (
              <Card key={image.id} className='overflow-hidden relative'>
                <div className='absolute right-2 top-2 z-10'>
                  <AlertModal
                    variantButton='destructive'
                    trigger={
                      <Button
                        variant='destructive'
                        size='icon'
                        className='w-8 h-8'
                        type='button'
                      >
                        <Trash className='w-4 h-4' />
                      </Button>
                    }
                    title='Eliminar imagen'
                    description='¿Estás seguro que deseas eliminar esta imagen?'
                    onContinue={async () => {
                      try {
                        const result = await deleteProductImage(
                          image.id,
                          image.url
                        );

                        if (!result?.ok) {
                          toast({
                            variant: 'destructive',
                            title: (
                              <div className='flex items-center gap-2'>
                                <CircleX className='h-5 w-5' />
                                <span>{'Error al eliminar :'}</span>
                              </div>
                            ) as unknown as string,
                            description: result?.error,
                          });
                          return;
                        }
                        toast({
                          title: (
                            <div className='flex items-center gap-2'>
                              <CheckCircle className='h-5 w-5' />
                              <span>Imagen eliminada : </span>
                            </div>
                          ) as unknown as string,
                          className: 'toast-success',
                          description: 'La imagen se eliminó correctamente',
                        });
                      } catch (error) {
                        console.log(error);
                        toast({
                          variant: 'destructive',
                          title: (
                            <div className='flex items-center gap-2'>
                              <CircleX className='h-5 w-5' />
                              <span>Error inesperado : </span>
                            </div>
                          ) as unknown as string,
                          description: 'Intente nuevamente',
                        });
                      }
                    }}
                  />
                </div>
                <ProductImage
                  alt={product.title ?? ''}
                  src={image.url}
                  width={300}
                  height={300}
                  className='w-full aspect-square object-cover'
                />
              </Card>
            ))}
          </div>
        </div>
      </form>
    </Form>
  );
};
