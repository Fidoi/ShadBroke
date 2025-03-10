'use client';

import Link from 'next/link';
import { ProductImage } from '@/components/products/product-image/ProductImage';
import { QuantitySelector } from '@/components/products/product/ui/QuantitySelector';
import { useCartStore } from '@/store';
import { useState, useEffect } from 'react';
import { Button } from '@/components';
import { currencyFormat } from '@/utils';
import { Loader2, Trash2 } from 'lucide-react';
import { ColorSelector } from '@/components/products/product/ui/ColorSelector';

export const ProductsInCart = () => {
  const updateProductQuantity = useCartStore(
    (state) => state.updateProductQuantity
  );
  const updateColor = useCartStore((state) => state.updateColor);
  const removeProduct = useCartStore((state) => state.removeProduct);
  const [loaded, setLoaded] = useState(false);
  const productsInCart = useCartStore((state) => state.cart);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return (
      <div className='flex justify-center items-center gap-2 h-20 text-muted-foreground'>
        <Loader2 className='animate-spin h-6 w-6' />
        <span>Por favor espere</span>
      </div>
    );
  }

  return (
    <div className='mt-6 space-y-6'>
      {productsInCart.map((product) => (
        <div
          key={`${product.slug}-${product.size}-${product.color}`}
          className='grid grid-cols-[100px_1fr] gap-4 items-start'
        >
          <Link
            href={`/product/${product.slug}`}
            className=' bg-muted rounded-lg overflow-hidden'
          >
            <ProductImage
              src={product.image}
              width={400}
              height={400}
              alt={product.title}
            />
          </Link>

          <div className='space-y-2'>
            <div className='flex justify-between gap-2'>
              <div className='space-y-1 flex-1'>
                <Link
                  href={`/product/${product.slug}`}
                  className='text-sm font-medium hover:underline line-clamp-2'
                >
                  {product.title}
                </Link>
                <p className='text-xs text-muted-foreground'>{product.size}</p>
                <p className='text-sm font-semibold'>
                  {currencyFormat(product.price)}
                </p>
              </div>

              <Button
                onClick={() => removeProduct(product)}
                variant='outline'
                className='h-8 w-8'
                aria-label='Remover producto'
              >
                <Trash2 className='h-4 w-4 text-red-500' />
              </Button>
            </div>

            <ColorSelector
              selectedColor={product.color}
              availableColors={product.colors}
              onColorChanged={(color) => updateColor(product, color)}
              isSummary
            />

            <div className='pt-2'>
              <QuantitySelector
                quantity={product.quantity}
                onQuantityChanged={(quantity) =>
                  updateProductQuantity(product, quantity)
                }
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
