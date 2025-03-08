'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

cloudinary.config(process.env.CLOUDINARY_URL ?? '');

export const updateUserProfile = async (
  userId: string,
  data: { name?: string; image?: string }
) => {
  const session = await auth();

  if (!session) throw new Error('No autenticado');

  if (session.user.id !== userId) throw new Error('No autorizado');

  if (session.user.role === 'supervisor' && data.name) {
    throw new Error('No autorizado');
  }

  return prisma.user.update({
    where: { id: userId },
    data,
  });
};

export const uploadImage = async (userId: string, formData: FormData) => {
  const session = await auth();

  if (session?.user.role === 'supervisor') {
    throw new Error('No autorizado');
  }
  const file = formData.get('image') as File;
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const result = await new Promise<UploadApiResponse>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        { folder: 'Shadbroke/profile-pictures' },
        (error, result) =>
          error ? reject(error) : resolve(result as UploadApiResponse)
      )
      .end(buffer);
  });

  return result.secure_url;
};
