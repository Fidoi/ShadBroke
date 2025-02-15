'use client';

import { Product } from '@/interfaces';

import Link from 'next/link';
import { useState } from 'react';
import { ProductImage } from './product-image/ProductImage';
import { Card } from '../ui/card';

interface Props {
  product: Product;
}

export const ProductGridItem = ({ product }: Props) => {
  const [displayImage, setDisplayImage] = useState(product.images[0]);
  return (
    <Card className='rounded-md overflow-hidden fade-in'>
      <Link href={`/products/product/${product.slug}`}>
        <ProductImage
          src={displayImage}
          alt={product.title}
          className=' object-cover rounded'
          width={300}
          height={300}
          onMouseEnter={() => setDisplayImage(product.images[1])}
          onMouseLeave={() => setDisplayImage(product.images[0])}
        />
      </Link>
      <div className='p-4 flex flex-col'>
        <Link
          href={`/products/${product.slug}`}
          className='hover:text-blue-600'
        >
          {product.title}
        </Link>
        <span className='font-bold'>${product.price}</span>
      </div>
    </Card>
  );
};
