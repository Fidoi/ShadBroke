export const revalidate = 60;

import { getUserFavorites } from '@/actions';
import { auth } from '@/auth.config';
import { PaginationNav, ProductGrid } from '@/components';

import { redirect } from 'next/navigation';

interface Props {
  searchParams: Promise<{ page?: string }>;
}

export default async function FavoritesPage({ searchParams }: Props) {
  const session = await auth();

  const page = (await searchParams).page
    ? Number((await searchParams).page)
    : 1;

  if (!session?.user) {
    redirect('/auth/login');
  }

  const { products, totalPages } = await getUserFavorites({
    page,
    userId: session.user.id,
  });

  return (
    <div className='max-w-6xl mx-auto p-6'>
      {products.length === 0 ? (
        <div className='text-center py-10'>
          <h1 className='text-xl font-semibold'>Aún no tienes favoritos</h1>
          <p className='text-gray-500 mt-2'>
            Guarda productos que te gusten usando el corazón ❤️
          </p>
        </div>
      ) : (
        <>
          <h1 className='text-2xl font-bold mb-6'>Tus Favoritos</h1>
          <ProductGrid products={products} />
          <PaginationNav totalPages={totalPages} />
        </>
      )}
    </div>
  );
}
