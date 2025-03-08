'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Image from 'next/image';
import { toast } from '@/hooks/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { CheckCircle, CircleX, Loader2 } from 'lucide-react';
import { updateUserProfile, uploadImage } from '@/actions';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const profileFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'El nombre debe tener al menos 2 caracteres',
    })
    .max(50),
  imageFile: z.any().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface Props {
  userId: string;
  name: string;
  email: string;
  image: string;
}

export function ProfileForm({ userId, name, email, image }: Props) {
  const { update } = useSession();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [previewImage, setPreviewImage] = useState(image);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name,
      imageFile: undefined,
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const onSubmit = (data: ProfileFormValues) => {
    startTransition(async () => {
      try {
        let imageUrl = previewImage;

        if (selectedFile) {
          const formData = new FormData();
          formData.append('image', selectedFile);
          imageUrl = await uploadImage(userId, formData);
        }

        await updateUserProfile(userId, {
          name: data.name,
          image: imageUrl,
        });

        await update({
          forceUpdate: true,
        });

        setSelectedFile(null);
        form.reset({ name: data.name });
        router.refresh();

        toast({
          title: (
            <div className='flex items-center gap-2'>
              <CheckCircle className='h-5 w-5' />
              <span>Ajuste de perfil : </span>
            </div>
          ) as unknown as string,
          description: 'Perfil actualizado correctamente',
          className: 'toast-success',
        });
      } catch (error) {
        toast({
          title: (
            <div className='flex items-center gap-2'>
              <CircleX className='h-5 w-5' />
              <span>Error de permisos : </span>
            </div>
          ) as unknown as string,
          description: `No se pudo actualizar el perfil: ${error}`,
          variant: 'destructive',
        });
      }
    });
  };

  return (
    <div className='space-y-8'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='grid gap-4'>
            <div className='space-y-2'>
              <FormLabel>Imagen de perfil</FormLabel>
              <div className='flex items-center gap-4'>
                <div className='relative h-20 w-20 rounded-full'>
                  {previewImage?.startsWith('http') ||
                  previewImage?.startsWith('blob') ? (
                    <Image
                      src={previewImage}
                      alt='Profile'
                      className='rounded-full object-cover'
                      fill
                      sizes='80px'
                    />
                  ) : (
                    <div className='flex h-full w-full items-center justify-center rounded-full bg-muted text-2xl font-bold'>
                      {previewImage}
                    </div>
                  )}
                </div>
                <FormItem>
                  <FormControl>
                    <label className='cursor-pointer'>
                      <Input
                        type='file'
                        className='hidden'
                        onChange={handleImageChange}
                        accept='image/*'
                      />
                      <Button asChild variant='outline'>
                        <span>Seleccionar nueva imagen</span>
                      </Button>
                    </label>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </div>
            </div>

            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Tu nombre'
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input value={email} readOnly disabled />
              </FormControl>
            </FormItem>
          </div>

          <Button type='submit' disabled={isPending}>
            {isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
            Actualizar perfil
          </Button>
        </form>
      </Form>
    </div>
  );
}
