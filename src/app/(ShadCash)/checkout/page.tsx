import { getRegionesWithComunas } from '@/actions';
import { AddressForm } from './address/AddressForm';
import { CartSummary } from './address/CartSummary';
import { auth } from '@/auth.config';
import { UserAddress } from '@/components/checkout/UserAddress';

export default async function AddressPage() {
  const session = await auth();
  const regiones = await getRegionesWithComunas();

  return (
    <div className='flex justify-center items-start p-8'>
      <div className='flex gap-4 max-w-6xl w-full flex-col md:flex-row'>
        <div className='flex-1'>
          {!session?.user ? (
            <AddressForm regiones={regiones} />
          ) : (
            <UserAddress session={session} regiones={regiones} />
          )}
        </div>
        <div className='flex-1'>
          <CartSummary />
        </div>
      </div>
    </div>
  );
}
