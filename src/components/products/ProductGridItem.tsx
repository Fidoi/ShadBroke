'use client';

import { ProductWithImages } from '@/interfaces';
import Link from 'next/link';
import { useState } from 'react';
import { ProductImage } from './product-image/ProductImage';
import { Card } from '../ui/card';
import { currencyFormat } from '@/utils';
import { DiscountBadge } from './product/ui/DiscountBadge';

interface Props {
  product: ProductWithImages;
}

export const ProductGridItem = ({ product }: Props) => {
  const [displayImage, setDisplayImage] = useState(product.images[0]);

  return (
    <Card className='rounded-md overflow-hidden fade-in w-full flex flex-col aspect-[3/4]'>
      <Link
        href={`/product/${product.slug}`}
        className='block h-full overflow-hidden relative flex-1'
      >
        <ProductImage
          src={displayImage}
          alt={product.title}
          className='w-full h-full object-cover transition-transform duration-300 hover:scale-105'
          width={600}
          height={800}
          onMouseEnter={() => setDisplayImage(product.images[1])}
          onMouseLeave={() => setDisplayImage(product.images[0])}
        />
      </Link>

      <div className='p-2 sm:p-3 md:p-4 flex flex-col gap-1'>
        <Link
          href={`/product/${product.slug}`}
          className='hover:text-blue-600 line-clamp-2 text-xs sm:text-sm font-medium'
        >
          {product.title}
        </Link>

        <div className='flex flex-col mt-1 sm:mt-2'>
          {product.discount && product.discount > 0 ? (
            <>
              <div className='gap-x-2 sm:gap-x-3 flex items-center'>
                <span className='text-xs sm:text-sm line-through text-gray-500'>
                  {currencyFormat(product.price)}
                </span>
                <DiscountBadge discount={product.discount} text='% off' />
              </div>
              <span className='text-sm sm:text-base md:text-lg font-bold text-primary'>
                {currencyFormat(product.price * (1 - product.discount / 100))}
              </span>
            </>
          ) : (
            <span className='text-sm sm:text-base md:text-lg font-bold'>
              {currencyFormat(product.price)}
            </span>
          )}
        </div>
      </div>
    </Card>
  );
};
