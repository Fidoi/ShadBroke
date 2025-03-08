'use client';
import React from 'react';
import { Share2, Copy, CircleX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import Image from 'next/image';
import { Input } from '../ui/input';
import { currencyFormat } from '@/utils';

interface ShareModalProps {
  title: string;
  description?: string;
  imageUrl: string;
  price: number;
}

export const ShareModal = ({
  title,
  description = '',
  imageUrl,
  price,
}: ShareModalProps) => {
  const { toast } = useToast();
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  const truncate = (text: string, maxLength: number) =>
    text.length > maxLength ? text.substring(0, maxLength) + '...' : text;

  const shareLinks = [
    {
      name: 'WhatsApp',
      icon: '/icons/whatsapp.svg',
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(
        `${title} - ${currentUrl}`
      )}`,
    },
    {
      name: 'Facebook',
      icon: '/icons/facebook.svg',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        currentUrl
      )}`,
    },
    {
      name: 'Instagram',
      icon: '/icons/instagram.svg',
      url: `https://www.instagram.com/?url=${encodeURIComponent(currentUrl)}`,
    },
    {
      name: 'Twitter',
      icon: '/icons/x.svg',
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        currentUrl
      )}&text=${encodeURIComponent(title)}`,
    },
  ];

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      toast({
        title: 'Success',
        className: 'toast-success',
        description: 'Enlace copiado al portapapeles',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: (
          <div className='flex items-center gap-2'>
            <CircleX className='h-5 w-5' />
            <span>Error de permisos:</span>
          </div>
        ) as unknown as string,
        description: `${error}`,
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Share2
          className='text-gray-500 hover:text-blue-500 transition-colors cursor-pointer'
          size={35}
        />
      </DialogTrigger>
      <DialogContent className='bg-white p-6 rounded-xl shadow-xl max-w-lg'>
        <DialogHeader>
          <DialogTitle className='text-2xl font-bold text-center mb-4'>
            Compartir Producto
          </DialogTitle>
        </DialogHeader>
        <div className='flex flex-row gap-4 items-center justify-center mt-6'>
          {shareLinks.map((link, index) => (
            <Button
              asChild
              key={`${link.name}-${index}`}
              className='p-2 rounded-xl w-12 h-12 flex items-center justify-center hover:scale-110 transition-transform'
            >
              <Link href={link.url} target='_blank' rel='noopener noreferrer'>
                <Image
                  src={link.icon}
                  alt={link.name}
                  width={32}
                  height={32}
                  className='object-contain'
                />
              </Link>
            </Button>
          ))}
        </div>
        <div className='flex gap-4'>
          <div className='w-1/2 relative h-40'>
            <Image
              src={imageUrl}
              alt={title}
              fill
              className='object-cover rounded'
            />
          </div>

          <div className='w-1/2 flex flex-col justify-between'>
            <div>
              <h3 className='text-xl font-bold'>{title}</h3>
              <p className='text-gray-700 mt-1 text-sm'>
                {truncate(description, 80)}
              </p>
            </div>
            <p className='text-lg font-semibold mt-2'>
              {currencyFormat(price)}
            </p>
          </div>
        </div>

        <div className='flex items-center gap-4 mt-6'>
          <Input
            id='link'
            defaultValue={currentUrl}
            readOnly
            className='p-3 text-sm rounded-lg flex-1'
          />
          <Button
            onClick={copyLink}
            type='button'
            size='sm'
            className='px-4 py-2 rounded-lg flex gap-2'
          >
            <Copy size={20} />
            Copiar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
