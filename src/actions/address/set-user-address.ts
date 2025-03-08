'use server';

import { Address } from '@/interfaces';
import prisma from '@/lib/prisma';

export const setUserAddress = async (address: Address, userId: string) => {
  try {
    const newAddress = await createOrReplaceAddress(address, userId);

    return {
      ok: true,
      address: newAddress,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'No se pudo grabar la direccion',
    };
  }
};

const createOrReplaceAddress = async (address: Address, userId: string) => {
  try {
    console.log({ userId });
    const addressToSave = {
      userId: userId,
      address: address.address,
      address2: address.address2,
      regionId: address.region.id,
      provinciaId: address.provincia.id,
      comunaId: address.comuna.id,
      firstName: address.firstName,
      lastName: address.lastName,
      phone: address.phone,
    };

    const storedAddress = await prisma.userAddress.findFirst({
      where: {
        userId,
        address: address.address,
      },
    });

    if (storedAddress) {
      const updatedAddress = await prisma.userAddress.update({
        where: { id: storedAddress.id },
        data: addressToSave,
      });
      return updatedAddress;
    } else {
      const newAddress = await prisma.userAddress.create({
        data: addressToSave,
      });
      return newAddress;
    }
  } catch (error) {
    console.log(error);
    throw new Error('No se pudo grabar la dirección');
  }
};
