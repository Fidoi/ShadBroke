import { getPaginatedProductsWithImages } from '@/actions';
import { PaginationNav } from '@/components';

import { ProductGrid } from '@/components/products/ProductGrid';
import { Gender } from '@prisma/client';

interface Props {
  params: Promise<{ gender: string }>;
  searchParams: Promise<{ page?: string }>;
}

export default async function GenderByPage({ params, searchParams }: Props) {
  const { gender } = await params;
  const { page: pageParam } = await searchParams;

  // Obtener el número de página, por defecto a 1
  const page = pageParam ? parseInt(pageParam) : 1;
  const { products, /* currentPage, */ totalPages } =
    await getPaginatedProductsWithImages({
      page,
      gender: gender as Gender,
    });

  // Redireccionar si no hay productos
  {
    /*if (products.length === 0) {
    redirect(`/gender/${gender}`);
  }*/
  }
  return (
    <div>
      <ProductGrid products={products} />
      page <PaginationNav totalPages={totalPages} />
    </div>
  );
}
