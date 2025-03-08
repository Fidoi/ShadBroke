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
      <>
        <Loader2 className='animate-spin' />
        Porfavor espere
      </>
    );
  }
  return (
    <div className='mt-6'>
      {productsInCart.map((product) => (
        <div
          key={`${product.slug}-${product.size}-${product.color}`}
          className='flex mb-5'
        >
          <Link
            className='hover:underline cursor-pointer'
            href={`/product/${product.slug}`}
          >
            <ProductImage
              src={product.image}
              width={100}
              height={100}
              style={{ width: '100px', height: '100' }}
              alt={product.title}
              className='mr-5 rounded'
            />
          </Link>
          <div>
            <div className='flex items-center justify-between w-full'>
              <div>
                <Link
                  className='hover:underline cursor-pointer'
                  href={`/product/${product.slug}`}
                >
                  {product.size} - {product.title}
                </Link>
                <p>{currencyFormat(product.price)}</p>
              </div>
              <Button
                onClick={() => removeProduct(product)}
                aria-label='Remover producto'
                variant='ghost'
              >
                <Trash2 className='h-6 w-6 text-red-500' />
              </Button>
            </div>

            <ColorSelector
              selectedColor={product.color}
              availableColors={product.colors}
              onColorChanged={(color) => updateColor(product, color)}
              isSummary
            />
            <div className='mt-8'>
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
