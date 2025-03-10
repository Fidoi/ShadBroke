import Image from 'next/image';

interface Props {
  src?: string;
  alt: string;
  className?: string;
  width: number;
  height: number;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  sizes?: number;
}

export const ProductImage = ({
  src,
  alt,
  className,
  width,
  height,
  onMouseEnter,
  onMouseLeave,
}: Props) => {
  const localSrc = src
    ? src.startsWith('http')
      ? src
      : `/products/${src}`
    : '/imgs/placeholder.jpg';

  return (
    <div className='overflow-hidden'>
      <Image
        src={localSrc}
        width={width}
        height={height}
        alt={alt}
        className={`object-cover${className}`}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
    </div>
  );
};
