'use client';

import { CartProduct, ProductWithImages, Size } from '@/interfaces';
import { useCartStore } from '@/store';
import { useState } from 'react';
import { SizeSelector } from './SizeSelector';
import { QuantitySelector } from './QuantitySelector';
import { Alert, AlertTitle, Button } from '@/components';
import { AlertCircle } from 'lucide-react';
import { ColorSelector } from './ColorSelector';
interface Props {
  product: ProductWithImages;
}

export const AddToCart = ({ product }: Props) => {
  const addProductToCart = useCartStore((state) => state.addProductToCart);
  const cart = useCartStore((state) => state.cart);
  const [size, setSize] = useState<Size | undefined>();
  const [color, setColor] = useState<string | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const addToCart = () => {
    setPosted(true);
    setErrorMessage('');
    const existingCartItem = cart.find(
      (item) =>
        item.id === product.id && item.size === size && item.color === color
    );
    const totalQuantity = (existingCartItem?.quantity || 0) + quantity;

    if (totalQuantity > product.inStock) {
      setErrorMessage(`No hay suficiente stock`);
      return;
    }
    if (product.inStock <= 0) {
      setErrorMessage('No hay stock disponible');
      return;
    }

    if (!size && !color) {
      setErrorMessage('Seleccione una talla y un color');
      return;
    }

    if (!size) {
      setErrorMessage('Seleccione una talla');
      return;
    }

    if (!color) {
      setErrorMessage('Seleccione un color');
      return;
    }

    const cartProduct: CartProduct = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      quantity: quantity,
      size: size,
      color: color,
      colors: product.colors,
      image: product.images[0],
    };
    addProductToCart(cartProduct);
    setPosted(false);
    setQuantity(1);
    setSize(undefined);
    setColor(undefined);
    setErrorMessage('');
  };
  const handleSizeChange = (size: Size) => {
    setSize(size);
    setErrorMessage('');
  };

  const handleColorChange = (color: string) => {
    setColor(color);
    setErrorMessage('');
  };

  return (
    <>
      {posted && errorMessage && (
        <div className='mb-2'>
          <Alert variant='destructive'>
            <AlertCircle className='h-5 w-5' />
            <AlertTitle>{errorMessage}</AlertTitle>
          </Alert>
        </div>
      )}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
        <ColorSelector
          selectedColor={color}
          availableColors={product.colors}
          onColorChanged={handleColorChange}
        />

        <div className='w-full'>
          <SizeSelector
            selectedSize={size}
            availableSizes={product.sizes}
            onSizeChanged={handleSizeChange}
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
