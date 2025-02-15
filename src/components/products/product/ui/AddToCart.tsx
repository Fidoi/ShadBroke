'use client';

import { CartProduct, Product, Size } from '@/interfaces';
import { useCartStore } from '@/store';
import { useState } from 'react';
import { SizeSelector } from './SizeSelector';
import { QuantitySelector } from './QuantitySelector';
import { Button } from '@/components';
interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {
  //const addProductToCart = useCartStore((state) => state.addProductToCart);
  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState(false);
  const addToCart = () => {
    setPosted(true);
    if (!size) return;
    //console.log(size, quantity);
    const cartProduct: CartProduct = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      quantity: quantity,
      size: size,
      image: product.images[0],
    };
    //addProductToCart(cartProduct);
    setPosted(false);
    setQuantity(1);
    setSize(undefined);
  };
  return (
    <>
      {posted && !size && (
        <span className='mt-2 text-red-500 fade-in'>
          - Debe de seleccionar una talla
        </span>
      )}

      {/* Fila superior: Color a la izquierda y Tallas a la derecha */}
      <div className='flex justify-between mb-6'>
        <div>
          <h3 className='text-md font-semibold mb-2'>Color</h3>
          <div className='flex gap-2'>
            <button
              className='w-8 h-8 rounded-full border'
              style={{ backgroundColor: '#e2c9b3' }}
            />
            <button
              className='w-8 h-8 rounded-full border border-gray-300'
              style={{ backgroundColor: '#000000' }}
              aria-label='Black color'
            />
            <button
              className='w-8 h-8 rounded-full border border-gray-300'
              style={{ backgroundColor: '#FFFFFF' }}
              aria-label='White color'
            />
          </div>
        </div>

        <div>
          <SizeSelector
            selectedSize={size}
            availableSizes={product.sizes}
            onSizeChanged={setSize}
          />
        </div>
      </div>

      <div className='flex gap-4 items-center my-6'>
        <QuantitySelector quantity={quantity} onQuantityChanged={setQuantity} />
        <Button onClick={addToCart} className='bg-blue-600 text-white w-full'>
          Agregar al carrito
        </Button>
      </div>
    </>
  );
};
