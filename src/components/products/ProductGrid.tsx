import { ProductWithImages } from '@/interfaces';
import { ProductGridItem } from './ProductGridItem';

interface Props {
  products: ProductWithImages[];
}

export const ProductGrid = ({ products }: Props) => {
  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4 md:gap-6 lg:gap-10 px-2 sm:px-0 mb-10'>
      {products.map((product) => (
        <ProductGridItem key={product.slug} product={product} />
      ))}
    </div>
  );
};
