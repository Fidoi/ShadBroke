'use server';

import prisma from '@/lib/prisma';

export const deleteUserAddress = async (addressId: string, userId: string) => {
  try {
    const deleted = await prisma.userAddress.deleteMany({
      where: {
        id: addressId,
        userId: userId,
      },
    });

    if (deleted.count === 0) {
      return {
        ok: false,
        message: 'No se encontró la dirección o no pertenece al usuario',
      };
    }

    return {
      ok: true,
      message: 'Dirección eliminada correctamente',
    };
  } catch (error) {
    console.error('Error al eliminar la dirección:', error);

    return {
      ok: false,
      message: 'No se pudo eliminar la dirección',
    };
  }
};
