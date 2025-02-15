'use client';

import { Button, Input } from '@/components/ui';
import { CircleMinus, CirclePlus } from 'lucide-react';

interface Props {
  quantity: number;
  onQuantityChanged: (value: number) => void;
}

export const QuantitySelector = ({ quantity, onQuantityChanged }: Props) => {
  const onValueChange = (value: number) => {
    if (quantity + value < 1) return;
    onQuantityChanged(quantity + value);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value) && value > 0) {
      onQuantityChanged(value);
    }
  };

  return (
    <div className='flex items-center'>
      <Button
        variant='outline'
        size='icon'
        className='h-8 w-8 shrink-0 rounded-full'
        onClick={() => onValueChange(-1)}
      >
        <CircleMinus />
      </Button>
      <Input
        type='text'
        value={quantity}
        onChange={handleInputChange}
        className='w-20 mx-3 text-center'
      />

      <Button
        variant='outline'
        size='icon'
        className='h-8 w-8 shrink-0 rounded-full'
        onClick={() => onValueChange(+1)}
      >
        <CirclePlus />
      </Button>
    </div>
  );
};
