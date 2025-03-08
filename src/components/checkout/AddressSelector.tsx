'use client';
import { useState } from 'react';

import { AddressCards } from './AddressCards';
import { Card } from '../ui/card';
import { useAddressStore, useFormStore } from '@/store';
import { Address } from '@/interfaces';

interface AddressSelectorProps {
  addresses: Address[];
  onSelect?: (selectedAddress: Address) => void;
}

export const AddressSelector = ({
  addresses,
  onSelect,
}: AddressSelectorProps) => {
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null
  );
  const { setIsFormValid } = useFormStore();

  const handleSelect = (address: Address) => {
    setSelectedAddressId(address.id!);
    setIsFormValid(true);
    const addressData = {
      firstName: address.firstName,
      lastName: address.lastName,
      address: address.address,
      address2: address.address2 || '',
      region: address.region,
      provincia: address.provincia,
      comuna: address.comuna,
      phone: address.phone,
    };

    useAddressStore.getState().setAddress(addressData);

    if (onSelect) {
      onSelect(address);
    }
  };

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
      {addresses.map((address, index) => (
        <Card
          key={address.id}
          onClick={() => handleSelect(address)}
          className={`cursor-pointer p-2 hover:bg-secondary ${
            selectedAddressId === address.id ? 'border-2 border-blue-500 ' : ''
          }`}
        >
          <AddressCards address={address} index={index + 1} />
        </Card>
      ))}
    </div>
  );
};
