'use server';

import prisma from '@/lib/prisma';

export const getRegionesWithComunas = async () => {
  return await prisma.region.findMany({
    include: {
      provincias: {
        include: {
          comunas: true,
        },
      },
    },
  });
};
