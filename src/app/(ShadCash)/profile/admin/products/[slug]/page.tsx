import { getCategories, getProductBySlug } from '@/actions';
import { redirect } from 'next/navigation';
import { ProductForm } from './ui/ProductForm';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { DeleteProductModalButton } from './ui/DeleteProductModal';
import { Button } from '@/components';

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  const [product, categories] = await Promise.all([
    getProductBySlug(slug),
    getCategories(),
  ]);

  if (!product && slug !== 'new') {
    redirect('/profile/admin/products');
  }

  return (
    <div className='px-4'>
      <div className='flex justify-between items-center mb-4'>
        <Button asChild variant='default'>
          <Link href='/profile/admin/products'>
            <ChevronLeft className='w-6 h-6' />
          </Link>
        </Button>

        {product ? (
          <Link
            href={`/product/${product.slug}`}
            className='text-3xl font-bold text-primary text-center block hover:underline'
          >
            {product.title}
          </Link>
        ) : (
          <span className='text-3xl font-bold text-primary text-center block'>
            Nuevo Producto
          </span>
        )}

        {product?.id ? (
          <DeleteProductModalButton productId={product.id} />
        ) : (
          <div className='w-6 h-6'></div>
        )}
      </div>

      <ProductForm product={product ?? {}} categories={categories} />
    </div>
  );
}
