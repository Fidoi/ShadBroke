'use client';
import { deleteProduct } from '@/actions';
import { AlertModal, Button } from '@/components';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, CircleX, Trash2 } from 'lucide-react';
import { useSession } from 'next-auth/react';

interface Props {
  productId: string;
}

export const DeleteProductModalButton = ({ productId }: Props) => {
  const { toast } = useToast();
  const { data: session } = useSession();

  const handleDelete = async () => {
    if (session?.user.role !== 'admin') {
      toast({
        variant: 'destructive',
        title: (
          <div className='flex items-center gap-2'>
            <CircleX className='h-5 w-5' />
            <span>Error de permisos :</span>
          </div>
        ) as unknown as string,
        description: 'Solo los administradores pueden eliminar productos',
      });
      return;
    }

    try {
      const result = await deleteProduct(productId);

      if (!result.ok) {
        toast({
          variant: 'destructive',
          title: (
            <div className='flex items-center gap-2'>
              <CircleX className='h-5 w-5' />
              <span>Error al Eliminar :</span>
            </div>
          ) as unknown as string,
          description: result.message || 'No se pudo eliminar el producto',
        });
      } else {
        toast({
          title: (
            <div className='flex items-center gap-2'>
              <CheckCircle className='h-5 w-5' />
              <span>Producto eliminado : </span>
            </div>
          ) as unknown as string,
          className: 'toast-success',
          description: 'El producto se ha eliminado correctamente',
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        variant: 'destructive',
        title: (
          <div className='flex items-center gap-2'>
            <CircleX className='h-5 w-5' />
            <span>Error inesperado :</span>
          </div>
        ) as unknown as string,
        description: 'Ocurrió un error al intentar eliminar el producto',
      });
    }
  };

  return (
    <AlertModal
      variantButton='destructive'
      trigger={
        <Button
          variant='destructive'
          className='flex items-center gap-2'
          size='sm'
        >
          <Trash2 className='w-4 h-4' />
          <span className='hidden sm:block'>Eliminar</span>
        </Button>
      }
      title='Eliminar producto'
      description='¿Estás seguro de eliminar este producto permanentemente? Esta acción no se puede deshacer.'
      onContinue={handleDelete}
    />
  );
};
