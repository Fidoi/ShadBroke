import { getPaginatedProductsWithImages } from '@/actions';
import { Button, ProductsTable } from '@/components';
import { Package, Plus } from 'lucide-react';
import Link from 'next/link';

export default async function ProductsPage() {
  const { products, totalCount } = await getPaginatedProductsWithImages({
    take: Number.MAX_SAFE_INTEGER,
  });

  return (
    <div className='container py-8'>
      <div className='flex justify-between'>
        <div className='flex gap-x-3'>
          <Package />
          <h1 className='text-2xl font-bold mb-4 bg-success-foreground'>
            Gestión de Productos ({totalCount})
          </h1>
        </div>
        <Link href={`/profile/admin/products/new`}>
          <Button variant={'success'}>
            <Plus className='w-4 h-4 mr-2' />
            Agregar producto
          </Button>
        </Link>
      </div>
      <ProductsTable products={products} />
    </div>
  );
}
