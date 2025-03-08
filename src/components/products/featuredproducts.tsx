import { ProductWithImages } from '@/interfaces';
import { ProductGridItem } from './ProductGridItem';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel';

interface Props {
  products: ProductWithImages[];
}

export const FeaturedProducts = ({ products }: Props) => {
  return (
    <div className='flex items-center justify-center'>
      <section className='max-w-7xl w-full'>
        <h1 className='flex text-3xl font-bold mb-4 text-primary items-center justify-center'>
          Productos en oferta
        </h1>

        <Carousel
          opts={{
            align: 'start',
            loop: true,
            dragFree: true,
          }}
          className='w-full'
        >
          <CarouselContent className='flex gap-x-9'>
            {products.map((product) => (
              <CarouselItem
                key={product.slug}
                className='flex-none basis-1/2 md:basis-1/3 lg:basis-1/4'
              >
                <ProductGridItem product={product} />
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className='hidden md:flex' />
          <CarouselNext className='hidden md:flex' />
        </Carousel>
      </section>
    </div>
  );
};
