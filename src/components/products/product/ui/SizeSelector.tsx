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
    <div>
      <h3 className='text-md font-semibold mb-2'>Tallas disponibles</h3>
      <div className='flex'>
        {availableSizes.map((size) => (
          <button
            key={size}
            onClick={() => onSizeChanged(size)}
            className={clsx(
              'mx-2 w-10 h-10 flex items-center justify-center border-2 rounded-full transition-colors duration-200',
              size === selectedSize
                ? 'border-blue-600 bg-blue-300'
                : 'border-transparent hover:border-blue-300'
            )}
          >
            <span className='text-lg font-semibold'>{size}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
