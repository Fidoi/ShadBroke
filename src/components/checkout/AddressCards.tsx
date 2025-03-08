'use client';

import { Trash2 } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui';
import { useSession } from 'next-auth/react';

import { useRouter } from 'next/navigation';
import { deleteUserAddress } from '@/actions';
import { Address } from '@/interfaces';
import { AlertModal } from '../modals/AlertModal';

interface AddressCardProps {
  address: Address;
  index: number;
}

export const AddressCards = ({ address, index }: AddressCardProps) => {
  const { data: session } = useSession();
  const router = useRouter();

  const removeAddress = async () => {
    if (!session?.user.id) return;

    const response = await deleteUserAddress(address.id!, session.user.id);

    if (response.ok) {
      router.refresh();
    }
  };
  return (
    <Card className='p-4 '>
      <div className='flex justify-between '>
        <p className='font-bold text-lg text-blue-700'>Dirección {index}</p>
        <AlertModal
          trigger={
            <Button aria-label='Eliminar dirección' variant='ghost'>
              <Trash2 className='h-6 w-6 text-red-500' />
            </Button>
          }
          title='Eliminar Direccion'
          description={`Eliminarás esta dirección: ${address.address} ${address.region.nombre}, ${address.provincia.nombre},¿Estás seguro?`}
          onContinue={removeAddress}
          variantButton='destructive'
        />
      </div>
      <div>
        <p className='font-bold'>
          {address.firstName} {address.lastName}
        </p>
        <p>{address.address}</p>
        {address.address2 && <p>{address.address2}</p>}

        <p>
          {address.comuna.nombre}, {address.provincia.nombre},
          {address.region.nombre}
        </p>

        <p>
          <strong>Tel:</strong> {address.phone}
        </p>
      </div>
    </Card>
  );
};
