'use client';

import { Button, Card, CardContent } from '@/components';
import { SheetClose } from '@/components/ui/sheet';
import { useCartStore } from '@/store';
import { currencyFormat } from '@/utils';
import { ShoppingBasket } from 'lucide-react';
import Link from 'next/link';

import { useEffect, useState } from 'react';

export const OrderSummary = () => {
  const [loaded, setLoaded] = useState(false);
  const subTotal = useCartStore((state) =>
    state.cart.reduce(
      (subTotal, product) => product.quantity * product.price + subTotal,
      0
    )
  );
  const totalItemsInCart = useCartStore((state) => state.getTotalItems());

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) return <p>Cargando</p>;
  return (
    <>
      {totalItemsInCart > 0 ? (
        <div className='border-t border-gray-200 px-4 py-6 sm:px-6'>
          <div className='flex justify-between text-base font-medium text-gray-900'>
            <p>Subtotal : </p>
            <p>{currencyFormat(subTotal)}</p>
          </div>
          <p className='mt-0.5 text-sm text-gray-500'>
            Los gastos de envío e impuestos se calculan al finalizar la compra.
          </p>
          <div className='mt-6'>
            <SheetClose asChild>
              <Button
                type='submit'
                asChild
                className='flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-xs hover:bg-indigo-700'
              >
                <Link href='/checkout'>Continuar compra</Link>
              </Button>
            </SheetClose>
          </div>
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center h-[500px]'>
          <Card className='w-full max-w-sm text-center '>
            <CardContent className='p-6 flex flex-col items-center'>
              <ShoppingBasket size={80} className='text-gray-500 mb-4' />
              <h1 className='text-lg font-semibold'>Tu carrito está vacío</h1>
              <p className='text-gray-500 text-sm mt-2'>
                Agrega productos para comenzar tu compra.
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};
