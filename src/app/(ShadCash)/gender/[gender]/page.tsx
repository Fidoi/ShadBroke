import { getPaginatedProductsWithImages } from '@/actions';
import { BreadcrumbWithCustomSeparator, PaginationNav } from '@/components';
import { ProductGrid } from '@/components/products/ProductGrid';
import { genderTranslations } from '@/utils';
import { Gender } from '@prisma/client';
import { notFound, redirect } from 'next/navigation';

interface Props {
  params: Promise<{ gender: string }>;
  searchParams: Promise<{ page?: string }>;
}

export default async function GenderByPage({ params, searchParams }: Props) {
  const { gender } = await params;
  if (!Object.values(Gender).includes(gender as Gender)) {
    notFound();
  }
  const { page: pageParam } = await searchParams;

  const page = pageParam ? parseInt(pageParam) : 1;
  const { products, /* currentPage, */ totalPages } =
    await getPaginatedProductsWithImages({
      page,
      gender: gender as Gender,
    });

  if (products.length === 0) {
    redirect(`/products`);
  }

  return (
    <div className='max-w-6xl mx-auto p-6 '>
      <div className='mb-2'>
        <BreadcrumbWithCustomSeparator
          items={[
            { label: 'Productos', href: '/products' },
            {
              label: genderTranslations[gender as Gender],
              href: `/gender/${gender}`,
            },
          ]}
        />
      </div>

      <ProductGrid products={products} />
      <PaginationNav totalPages={totalPages} />
    </div>
  );
}
