import type { Size } from '@/interfaces';
import clsx from 'clsx';

interface Props {
  selectedSize?: Size;
  availableSizes: Size[];
  onSizeChanged: (size: Size) => void;
}

export const SizeSelector = ({
  selectedSize,
  availableSizes,
  onSizeChanged,
}: Props) => {
  return (
    <div className='w-full'>
      <h3 className='text-md font-semibold mb-2'>Tallas disponibles</h3>
      <div className='flex flex-wrap gap-2'>
        {availableSizes.map((size) => (
          <button
            key={size}
            onClick={() => onSizeChanged(size)}
            className={clsx(
              'min-w-10 h-10 flex items-center justify-center border-2 rounded-full transition-colors duration-200 px-2',
              size === selectedSize
                ? 'border-blue-600 bg-blue-300'
                : 'border-gray-200 hover:border-blue-300'
            )}
          >
            <span className='text-sm font-semibold'>{size}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
