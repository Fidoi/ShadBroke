'use server';

import prisma from '@/lib/prisma';

export const getUserAddresses = async (userId: string) => {
  try {
    const addresses = await prisma.userAddress.findMany({
      where: { userId },
      include: {
        region: {
          include: {
            provincias: {
              include: {
                comunas: true,
              },
            },
          },
        },
        provincia: {
          include: {
            comunas: true,
          },
        },
        comuna: true,
      },
    });

    if (!addresses.length) return [];

    return addresses.map(
      ({ address2, region, provincia, comuna, ...rest }) => ({
        ...rest,
        address2: address2 ?? '',
        region: {
          id: region.id,
          nombre: region.nombre,
          provincias: region.provincias,
        },
        provincia: {
          id: provincia.id,
          nombre: provincia.nombre,
          comunas: provincia.comunas,
        },
        comuna: {
          id: comuna.id,
          nombre: comuna.nombre,
        },
      })
    );
  } catch (error) {
    console.error('Error fetching user addresses:', error);
    return [];
  }
};
