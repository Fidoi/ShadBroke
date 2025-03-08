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
    <Card className='rounded-md overflow-hidden fade-in h-[400px] min-w-[350px] max-w-[350px] flex flex-col'>
      <Link
        href={`/product/${product.slug}`}
        className='block h-[350px] overflow-hidden'
      >
        <ProductImage
          src={displayImage}
          alt={product.title}
          className='w-full h-full object-cover'
          width={350}
          height={350}
          onMouseEnter={() => setDisplayImage(product.images[1])}
          onMouseLeave={() => setDisplayImage(product.images[0])}
        />
      </Link>

      <div className='p-4 flex flex-col gap-2 flex-1'>
        <Link
          href={`/products/${product.slug}`}
          className='hover:text-blue-600 line-clamp-2 text-sm font-medium'
        >
          {product.title}
        </Link>

        <div className='flex flex-col mt-2'>
          {product.discount && product.discount > 0 ? (
            <>
              <div className='gap-x-3 flex'>
                <span className='text-sm line-through text-gray-500 '>
                  {currencyFormat(product.price)}
                </span>
                <DiscountBadge discount={product.discount} text='% off' />
              </div>
              <span className='text-lg font-bold text-primary'>
                {currencyFormat(product.price * (1 - product.discount / 100))}
              </span>
            </>
          ) : (
            <span className='text-lg font-bold'>
              {currencyFormat(product.price)}
            </span>
          )}
        </div>
      </div>
    </Card>
  );
};
