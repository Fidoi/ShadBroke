import { getUserAddresses } from '@/actions';
import type { Session } from 'next-auth';
import { Region } from '@/interfaces';
import { AddressManager } from './AddressManager';
import { AddressForm } from '@/app/(ShadCash)/checkout/address/AddressForm';

interface UserAddressProps {
  session: Session;
  regiones: Region[];
}

export const UserAddress = async ({ session, regiones }: UserAddressProps) => {
  const userAddress = (await getUserAddresses(session.user.id)) ?? [];

  return (
    <div className='w-full'>
      {userAddress.length > 0 ? (
        <AddressManager addresses={userAddress} regiones={regiones} />
      ) : (
        <>
          <h3 className='text-xl font-bold mb-4'>
            No tienes direcciones, agrega una
          </h3>
          <AddressForm regiones={regiones} />
        </>
      )}
    </div>
  );
};
