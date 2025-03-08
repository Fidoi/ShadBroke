'use client';
import { useState } from 'react';
import { AddressSelector } from './AddressSelector';
import { AddressForm } from '@/app/(ShadCash)/checkout/address/AddressForm';
import { Card, CardContent, CardTitle } from '../ui/card';
import type { Address, Region } from '@/interfaces';
import { ChevronLeft, CirclePlus, House } from 'lucide-react';
import { useCartStore } from '@/store';

interface AddressManagerProps {
  addresses: Address[];
  regiones: Region[];
}

export const AddressManager = ({
  addresses,
  regiones,
}: AddressManagerProps) => {
  const productsInCart = useCartStore((state) => state.cart);
  const [showForm, setShowForm] = useState(false);
  if (productsInCart.length === 0)
    return (
      <Card className='w-full text-center p-4'>
        <CardContent className='p-6 flex flex-col items-center'>
          <House size={80} className='text-gray-500 mb-4' />
          <h1 className='text-lg font-semibold'>Tu carrito está vacío</h1>
          <p className='text-gray-500 text-sm mt-2'>
            Tus direcciones apareceran cuando tengas productos en tu carrito
          </p>
        </CardContent>
      </Card>
    );
  return (
    <>
      {!showForm ? (
        <>
          <h3 className='text-xl font-bold mb-4'>Tus Direcciones</h3>
          <AddressSelector addresses={addresses} />
          <div
            onClick={() => setShowForm(true)}
            className='cursor-pointer mt-3'
          >
            <Card className='p-4 border-dashed border-2 flex items-center justify-center hover:bg-secondary'>
              <CardTitle className='flex '>
                Usar una dirección nueva <CirclePlus className='ml-5' />
              </CardTitle>
            </Card>
          </div>
        </>
      ) : (
        <div>
          <div className='flex gap-4'>
            <ChevronLeft
              onClick={() => setShowForm(false)}
              className='cursor-pointer hover:bg-secondary rounded-full'
            />
            <h2 className='text-xl font-bold mb-4'>Nueva direccion</h2>
          </div>
          <AddressForm regiones={regiones} />
        </div>
      )}
    </>
  );
};
