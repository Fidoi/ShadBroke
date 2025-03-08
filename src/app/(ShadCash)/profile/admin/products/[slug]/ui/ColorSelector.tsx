import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { ProductFormInputs } from '@/schemas';

interface ColorsInputProps {
  field: {
    value: string[];
  };
  form: UseFormReturn<ProductFormInputs>;
}

export function ColorsInput({ field, form }: ColorsInputProps) {
  const [tempColor, setTempColor] = useState('');

  const addColor = () => {
    if (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(tempColor)) {
      if (!field.value?.includes(tempColor)) {
        form.setValue('colors', [...(field.value || []), tempColor]);
      }
      setTempColor('');
    }
  };

  return (
    <div className='space-y-4'>
      <div className='flex gap-2 items-center'>
        <Input
          type='color'
          className='h-10 w-20 p-1'
          value={tempColor}
          onChange={(e) => setTempColor(e.target.value.toUpperCase())}
        />

        <Input
          type='text'
          placeholder='#FFFFFF'
          value={tempColor}
          onChange={(e) => setTempColor(e.target.value.toUpperCase())}
          pattern='^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$'
        />
        <Button type='button' onClick={addColor}>
          Agregar
        </Button>
      </div>

      <div className='flex flex-wrap gap-2'>
        {field.value?.map((color, index) => (
          <div
            key={index}
            className='relative h-10 w-10 rounded-full border'
            style={{ backgroundColor: color }}
          >
            <Button
              type='button'
              variant='ghost'
              size='icon'
              className='absolute -right-2 -top-2 h-6 w-6 rounded-full bg-destructive/80 p-1 hover:bg-destructive'
              onClick={() =>
                form.setValue(
                  'colors',
                  field.value.filter((c: string) => c !== color)
                )
              }
            >
              <Trash className='h-4 w-4 text-white' />
            </Button>
            <span className='sr-only'>{color}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
