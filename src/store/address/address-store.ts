import { Comuna, Provincia, Region } from '@/interfaces';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface State {
  address: {
    firstName: string;
    lastName: string;
    address: string;
    address2?: string;
    region: Region;
    provincia: Provincia;
    comuna: Comuna;
    phone: string;
  };

  setAddress: (address: State['address']) => void;
}

export const useAddressStore = create<State>()(
  persist(
    (set) => ({
      address: {
        firstName: '',
        lastName: '',
        address: '',
        address2: '',
        region: { id: 0, nombre: '', provincias: [] },
        provincia: { id: 0, nombre: '', comunas: [] },
        comuna: { id: 0, nombre: '' },
        phone: '',
      },
      setAddress: (address) => {
        set({ address });
      },
    }),
    { name: 'address-storage' }
  )
);
