'use client';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, Input, Separator } from '@/components';
import Link from 'next/link';
import { useAddressStore, useCartStore, useFormStore } from '@/store';
import { currencyFormat } from '@/utils';
import { QuantitySelector } from '@/components/products/product/ui/QuantitySelector';
import Image from 'next/image';
import { AlertCircle, ShoppingBasket } from 'lucide-react';

import { toast } from '@/hooks/use-toast';
import { handleWebPayPayment, placeOrder } from '@/actions';
import { useState } from 'react';

export const CartSummary = ({ className }: { className?: string }) => {
  const [stockError, setStockError] = useState<string | null>(null);
  const productsInCart = useCartStore((state) => state.cart);
  const subTotal = useCartStore((state) =>
    state.cart.reduce(
      (subTotal, product) => product.quantity * product.price + subTotal,
      0
    )
  );
  const updateProductQuantity = useCartStore(
    (state) => state.updateProductQuantity
  );

  const { submitForm, isFormValid } = useFormStore();

  const address = useAddressStore((state) => state.address);

  const handleConfirm = async () => {
    setStockError(null);
    try {
      if (submitForm && isFormValid) {
        submitForm();
      }

      if (!address) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Completa el formulario de dirección primero',
        });
        return;
      }

      const productsToOrder = productsInCart.map((product) => ({
        productId: product.id,
        quantity: product.quantity,
        size: product.size,
      }));

      const resp = await placeOrder(productsToOrder, address);

      if (!resp) {
        throw new Error('No se pudo procesar la orden');
      }

      if (!resp.ok) {
        throw new Error(resp.message || 'Error al procesar la compra');
      }

      await handleWebPayPayment(resp.order!.total, resp.order!.id);
    } catch (error) {
      if (error instanceof Error) {
        const productMatch = error.message.match(/"(.*?)"/);
        const productName = productMatch ? productMatch[1] : 'Producto';
        setStockError(productName);
      }
    }
  };

  if (productsInCart.length === 0)
    return (
      <Card className='w-full text-center p-4'>
        <CardContent className='p-6 flex flex-col items-center'>
          <CardTitle>Sin productos</CardTitle>
          <ShoppingBasket size={80} className='text-gray-500 mb-4' />
          <h1 className='text-lg font-semibold'>Tu carrito está vacío</h1>
          <p className='text-gray-500 text-sm mt-2'>
            Agrega productos para comenzar tu compra.
          </p>
        </CardContent>
      </Card>
    );

  return (
    <Card className={`w-full ${className}`}>
      <CardHeader>
        <CardTitle>Resumen del Carrito</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        {productsInCart.map((product) => (
          <div key={`${product.slug}-${product.size}-${product.color}`}>
            <div className='space-y-2'>
              <div className='flex justify-between'>
                <div className='flex'>
                  <Link
                    className='hover:underline cursor-pointer'
                    href={`/product/${product.slug}`}
                  >
                    <Image
                      src={product.image}
                      width={70}
                      height={70}
                      alt={product.title}
                      className='mr-5 rounded'
                    />
                  </Link>
                  <div>
                    <span>
                      {product.size} - {product.title}
                    </span>
                    <QuantitySelector
                      quantity={product.quantity}
                      onQuantityChanged={(quantity) =>
                        updateProductQuantity(product, quantity)
                      }
                    />
                  </div>
                </div>
                <span>{currencyFormat(product.price * product.quantity)}</span>
              </div>
            </div>
            {stockError === product.title && (
              <Alert variant='destructive' className='mt-2'>
                <AlertCircle className='h-4 w-4' />
                <AlertTitle className='ml-2'>
                  {product.title} - sin Stock
                </AlertTitle>
              </Alert>
            )}
          </div>
        ))}
        <div className='space-y-2'>
          <Separator className='my-3' />
          <div className='flex justify-between font-bold'>
            <span>Total</span>
            <span>{currencyFormat(subTotal)}</span>
          </div>
        </div>
        <div className='flex flex-row gap-2'>
          <Input placeholder='Código de cupon' />
          <Button className='w-full'>Aplicar</Button>
        </div>
        <Separator />
        <Image src='/webpay.png' height={20} width={150} alt='webpay icon' />
        Pagar con Webpay, serás redireccionado a Webpay
        <div className='flex gap-4'>
          <Button variant='outline' className='flex-1' asChild>
            <Link href='/'>Seguir Comprando</Link>
          </Button>
          <Button
            className='flex-1'
            onClick={handleConfirm}
            disabled={!isFormValid}
          >
            Confirmar Compra
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
