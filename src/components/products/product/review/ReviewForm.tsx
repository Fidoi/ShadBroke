'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Session } from 'next-auth';
import { ProfileAvatar } from '@/components/navbar/ProfileAvatar';
import { createReview } from '@/actions';
import { MessageCircleMore, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

interface ReviewFormProps {
  session: Session | null;
  productId: string;
}

export const ReviewForm = ({ session, productId }: ReviewFormProps) => {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [hoverRating, setHoverRating] = useState<number>(0);

  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    startTransition(async () => {
      try {
        await createReview(productId, rating, comment);
        setRating(0);
        setComment('');
        toast({ title: 'Reseña publicada exitosamente' });
      } catch (error) {
        toast({
          title: 'Error',
          description:
            error instanceof Error
              ? error.message
              : 'No se pudo publicar la reseña',
          variant: 'destructive',
        });
      }
    });
  };
  if (!session) {
    return (
      <div className='w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm border text-center space-y-4'>
        <MessageCircleMore className='w-12 h-12 mx-auto text-gray-400' />
        <h3 className='text-xl font-semibold'>
          Para dejar una reseña necesitas iniciar sesión
        </h3>
        <div className='flex justify-center gap-4'>
          <Button asChild variant='outline' className='rounded-full'>
            <Link href='/auth/login'>Ingresar</Link>
          </Button>
          <Button asChild className='rounded-full'>
            <Link href='/auth/register'>Registrarse</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className='w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm border'>
      <h3 className='flex flex-row text-xl font-semibold mb-1 gap-x-3'>
        <span>Deja tu reseña </span>
        <MessageCircleMore />:
      </h3>

      <form onSubmit={handleSubmit} className='flex gap-4'>
        <div className='flex-1 space-y-4'>
          <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 w-full'>
            <div className='flex flex-wrap '>
              {[1, 2, 3, 4, 5].map((star) => (
                <Button
                  key={star}
                  variant='ghost'
                  size='icon'
                  type='button'
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className='p-0 hover:bg-transparent'
                >
                  <Star
                    className={`w-8 h-8 sm:w-8 sm:h-8 transition-colors ${
                      (hoverRating || rating) >= star
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300 fill-gray-100'
                    }`}
                    strokeWidth={2}
                    fill='currentColor'
                  />
                </Button>
              ))}
            </div>

            <Button
              type='submit'
              disabled={!rating || !comment || isPending}
              className='hidden md:inline-flex bg-primary hover:bg-primary/90 px-6 rounded-full'
            >
              Publicar reseña
            </Button>
          </div>
          <div className='flex flex-row gap-2 sm:gap-4 items-center'>
            <div className='pt-1 '>
              <ProfileAvatar
                session={session}
                className='h-12 w-12 md:h-20 md:w-20 flex-shrink-0'
              />
            </div>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder='Comparte tu experiencia con el producto...'
              className='sn: min-h-[100px] md:max-h-[50px] w-full resize-none border-gray-300 text-md sm:text-base'
            />
          </div>
          <Button
            type='submit'
            disabled={!rating || !comment || isPending}
            className='md:hidden w-full bg-primary hover:bg-primary/90 rounded-full'
          >
            Publicar reseña
          </Button>
        </div>
      </form>
    </div>
  );
};
