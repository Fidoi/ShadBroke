import { Button } from '@/components/ui';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Props {
  selectedColor?: string;
  availableColors: string[];
  onColorChanged: (color: string) => void;
  isSummary?: boolean;
}

export const ColorSelector = ({
  selectedColor,
  availableColors,
  onColorChanged,
  isSummary = false,
}: Props) => {
  return (
    <>
      {isSummary ? (
        <>
          <h3 className='text-md mb-2'>Color Seleccionado:</h3>
          <Select value={selectedColor} onValueChange={onColorChanged}>
            <SelectTrigger
              className='w-[50px] h-[20px] p-2 rounded'
              style={{ backgroundColor: selectedColor || 'white' }}
            >
              <SelectValue placeholder='Selecciona un color' />
            </SelectTrigger>
            <SelectContent>
              {availableColors.map((color) => (
                <SelectItem
                  key={color}
                  value={color}
                  className=' h-6 rounded-md w-full mb-1'
                  style={{ backgroundColor: color }}
                />
              ))}
            </SelectContent>
          </Select>
        </>
      ) : (
        <div>
          <h3 className='text-md font-semibold mb-2'>Colores disponibles</h3>
          <div className='flex gap-2'>
            {availableColors.map((color) => (
              <Button
                key={color}
                onClick={() => onColorChanged(color)}
                className={`w-9 h-9 rounded-full border transition-colors ${
                  selectedColor === color
                    ? 'border-blue-600'
                    : 'border-gray-300'
                }`}
                style={{ backgroundColor: color }}
                aria-label={`Color ${color}`}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};
