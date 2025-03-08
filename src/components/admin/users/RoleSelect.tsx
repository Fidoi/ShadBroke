'use client';

import { useState, useEffect } from 'react';
import { changeUserRole } from '@/actions';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Role } from '@prisma/client';
import { CheckCircle, CircleX } from 'lucide-react';

interface Props {
  userId: string;
  initialRole: Role;
}

export const UserRoleSelect = ({ userId, initialRole }: Props) => {
  const { toast } = useToast();
  const [role, setRole] = useState(initialRole);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    setRole(initialRole);
  }, [initialRole]);

  const handleRoleChange = async (newRole: Role) => {
    const originalRole = role;
    setIsUpdating(true);
    try {
      setRole(newRole);

      const result = await changeUserRole(userId, newRole);

      if (!result.ok) {
        setRole(originalRole);
        toast({
          variant: 'destructive',
          title: (
            <div className='flex items-center gap-2'>
              <CircleX className='h-5 w-5' />
              <span>Error de permisos : </span>
            </div>
          ) as unknown as string,
          description: result.message || 'No tienes los permisos necesarios',
        });
      }
      if (result.ok) {
        toast({
          title: (
            <div className='flex items-center gap-2'>
              <CheckCircle className='h-5 w-5' />
              <span>Exito! : </span>
            </div>
          ) as unknown as string,
          className: 'toast-success',
          description: `El usuario ha sido modificado`,
        });
      }
    } catch {
      setRole(originalRole);
      toast({
        variant: 'destructive',
        title: (
          <div className='flex items-center gap-2'>
            <CircleX className='h-5 w-5' />
            <span>Error : </span>
          </div>
        ) as unknown as string,
        description: 'Error al actualizar el rol',
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Select value={role} onValueChange={handleRoleChange} disabled={isUpdating}>
      <SelectTrigger>
        <SelectValue placeholder={role} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {Object.values(Role).map((roleValue) => (
            <SelectItem key={roleValue} value={roleValue}>
              {roleValue}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
