export const revalidate = 60; /// 60 Segundos

import { getPaginatedProductsWithImages } from '@/actions';
import { PaginationNav, ProductGrid } from '@/components';

import { redirect } from 'next/navigation';

interface Props {
  searchParams: Promise<{ page?: string }>;
}

export default async function Home({ searchParams }: Props) {
  const page = (await searchParams).page
    ? Number((await searchParams).page)
    : 1;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { products, currentPage, totalPages } =
    await getPaginatedProductsWithImages({ page });

  //console.log({ currentPage, totalPages });
  if (products.length === 0) {
    redirect('/');
  }

  return (
    <>
      <ProductGrid products={products} />
      <PaginationNav totalPages={totalPages} />
    </>
  );
}
