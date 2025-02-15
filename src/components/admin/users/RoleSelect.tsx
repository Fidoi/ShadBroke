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
          title: 'Error de permisos',
          description: result.message || 'No tienes los permisos necesarios',
        });
      }
      if (result.ok) {
        console.log('ya');
        toast({
          title: `Success`,
          className: 'toast-success',
          description: `El usuario ha sido modificado`,
        });
      }
    } catch {
      setRole(originalRole);
      toast({
        variant: 'destructive',
        title: 'Error',
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
