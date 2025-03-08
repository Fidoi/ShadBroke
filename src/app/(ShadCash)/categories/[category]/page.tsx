import { getPaginatedProductsWithImages } from '@/actions';
import { BreadcrumbWithCustomSeparator, PaginationNav } from '@/components';
import { ProductGrid } from '@/components/products/ProductGrid';
import { Type } from '@/interfaces';
import { categoriesTranslations } from '@/utils';
import { notFound, redirect } from 'next/navigation';

interface Props {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ page?: string }>;
}

export default async function CategoryByPage({ params, searchParams }: Props) {
  const { category } = await params;
  const { page: pageParam } = await searchParams;

  const page = pageParam ? parseInt(pageParam) : 1;

  const { products, totalPages } = await getPaginatedProductsWithImages({
    page,
    category,
  });
  const validTypes: Type[] = ['shirt', 'pant', 'hoodie', 'hat', 'sweatshirt'];

  if (!validTypes.includes(category as Type)) {
    notFound();
  }

  if (products.length === 0) {
    redirect('/products');
  }

  return (
    <div className='max-w-6xl mx-auto p-6'>
      <div className='mb-2'>
        <BreadcrumbWithCustomSeparator
          items={[
            { label: 'Productos', href: '/products' },
            {
              label: categoriesTranslations[category as Type],
              href: `/categories/${category}`,
            },
          ]}
        />
      </div>

      <ProductGrid products={products} />
      <PaginationNav totalPages={totalPages} />
    </div>
  );
}
