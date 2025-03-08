export const revalidate = 60;

import { getPaginatedProductsWithImages } from '@/actions';
import {
  BreadcrumbWithCustomSeparator,
  PaginationNav,
  ProductGrid,
} from '@/components';

import { redirect } from 'next/navigation';

interface Props {
  searchParams: Promise<{ page?: string }>;
}

export default async function Home({ searchParams }: Props) {
  const page = (await searchParams).page
    ? Number((await searchParams).page)
    : 1;

  const { products, totalPages } = await getPaginatedProductsWithImages({
    page,
  });

  if (products.length === 0) {
    redirect('/');
  }

  return (
    <>
      <div className='max-w-6xl mx-auto p-6 '>
        <div className='mb-2'>
          <BreadcrumbWithCustomSeparator
            items={[
              { label: 'Productos', href: '/products' },
              { label: '', href: '/' },
            ]}
          />
        </div>

        <ProductGrid products={products} />
        <PaginationNav totalPages={totalPages} />
      </div>
    </>
  );
}
