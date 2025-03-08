'use client';

import { Star, Trash } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { deleteReview } from '@/actions';
import { toast } from '@/hooks/use-toast';
import { Session } from 'next-auth';
import { AlertModal, Separator } from '@/components';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface ReviewItemProps {
  review: {
    id: string;
    comment: string;
    rating: number;
    createdAt: Date | string;
    user: {
      name: string;
      image: string | null;
    };
  };
  session: Session | null;
}

export const ReviewItem = ({ review, session }: ReviewItemProps) => {
  const formattedDate = format(
    new Date(review.createdAt),
    "dd 'de' MMMM 'de' yyyy",
    { locale: es }
  );
  const handleDelete = async () => {
    try {
      await deleteReview(review.id);
      toast({ title: 'Reseña eliminada exitosamente' });
    } catch (error) {
      toast({
        title: 'Error',
        description:
          error instanceof Error ? error.message : 'Error al eliminar',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className='relative group'>
      {session?.user.role === 'admin' && (
        <AlertModal
          trigger={
            <Button
              variant='ghost'
              size='icon'
              className='absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity'
            >
              <Trash className='h-4 w-4 text-red-500' />
            </Button>
          }
          title='Eliminar Comentario'
          description={`Eliminaras el comentario de ${review.user.name},¿Estás seguro?`}
          onContinue={handleDelete}
          variantButton='destructive'
        />
      )}

      <div className='flex items-center gap-3'>
        <Avatar>
          <AvatarImage
            src={review.user.image || '/default-avatar.png'}
            alt={review.user.name}
          />
          <AvatarFallback>{review.user.name?.charAt(0)}</AvatarFallback>
        </Avatar>

        <div>
          <div className='flex item-center justify-center'>
            <p className='font-semibold mr-2'>{review.user.name}</p>
            <p className='text-xs text-gray-400 mt-1'>{formattedDate}</p>
          </div>
          <div className='flex items-center'>
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < review.rating
                    ? 'text-yellow-500 fill-yellow-500'
                    : 'text-gray-300 fill-gray-100'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
      <p className='mt-2 text-sm text-muted-foreground ml-2'>
        {review.comment}
      </p>

      <Separator className='my-4' />
    </div>
  );
};
