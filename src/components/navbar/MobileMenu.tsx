'use client';

import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode } from 'swiper/modules';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Button } from '../ui/button';
import { ChevronDown, X } from 'lucide-react';
import { useEffect, useRef } from 'react';

const components = [
  {
    title: 'Polerones',
    href: '/categories/sweatshirt',
    description: 'Prendas abrigadas con mangas largas, ideales para el frío.',
  },
  {
    title: 'Camisas',
    href: '/categories/shirt',
    description: 'Ropa formal o casual con botones y cuello.',
  },
  {
    title: 'Hoodies',
    href: '/categories/hoodie',
    description: 'Sudaderas con capucha para un estilo cómodo y urbano.',
  },
  {
    title: 'Gorros',
    href: '/categories/hat',
    description: 'Accesorios para la cabeza que protegen del frío o el sol.',
  },
];

export default function MobileMenu({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const swiperRef = useRef<unknown>(null);
  const touchStartX = useRef(0);

  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartX.current;

    if (deltaX < -50) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('touchstart', handleTouchStart);
      document.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isOpen]);

  return (
    <div
      className={`lg:hidden fixed inset-0 w-full h-full bg-white z-50 transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out overflow-y-auto`}
    >
      <div className='sticky top-0 bg-white z-10 border-b'>
        <div className='flex justify-between items-center p-4'>
          <h2 className='text-xl font-bold'>Menú</h2>
          <Button
            variant='ghost'
            size='icon'
            onClick={onClose}
            aria-label='Cerrar menú'
          >
            <X className='h-6 w-6' />
          </Button>
        </div>
      </div>

      <Swiper
        modules={[Navigation, FreeMode]}
        spaceBetween={20}
        slidesPerView={1}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        autoHeight={true}
        className='h-auto'
      >
        <SwiperSlide>
          <div className='p-6 space-y-6'>
            <Collapsible>
              <CollapsibleTrigger className='w-full flex justify-between items-center'>
                <span className='text-lg font-medium'>Género</span>
                <ChevronDown className='h-5 w-5' />
              </CollapsibleTrigger>
              <CollapsibleContent className='mt-4 space-y-4'>
                <Link
                  href='/products'
                  className='relative block h-40 w-full rounded-md overflow-hidden'
                  onClick={onClose}
                >
                  <Image
                    src='https://images.pexels.com/photos/1884579/pexels-photo-1884579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                    alt='Ver todo'
                    fill
                    className='object-cover'
                  />
                  <div className='absolute inset-0 bg-black/40 p-4 flex flex-col justify-end text-white'>
                    <h3 className='text-lg font-medium'>Ver todo</h3>
                    <p className='text-sm'>
                      Revisa toda la ropa de última moda
                    </p>
                  </div>
                </Link>

                <MobileMenuItem
                  href='/gender/men'
                  title='Hombres 👨🏻'
                  onClose={onClose}
                >
                  Descubre nuestra exclusiva colección de moda masculina
                </MobileMenuItem>

                <MobileMenuItem
                  href='/gender/women'
                  title='Mujeres 👩🏻‍🦰'
                  onClose={onClose}
                >
                  Explora las últimas tendencias en moda femenina
                </MobileMenuItem>

                <MobileMenuItem
                  href='/gender/kid'
                  title='Niños 👦🏻'
                  onClose={onClose}
                >
                  Encuentra ropa cómoda y moderna para los más pequeños
                </MobileMenuItem>
              </CollapsibleContent>
            </Collapsible>
            <Collapsible>
              <CollapsibleTrigger className='w-full flex justify-between items-center'>
                <span className='text-lg font-medium'>Categorías</span>
                <ChevronDown className='h-5 w-5' />
              </CollapsibleTrigger>
              <CollapsibleContent className='mt-4 space-y-4'>
                {components.map((item) => (
                  <MobileMenuItem
                    key={item.title}
                    href={item.href}
                    title={item.title}
                    onClose={onClose}
                  >
                    {item.description}
                  </MobileMenuItem>
                ))}
              </CollapsibleContent>
            </Collapsible>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

function MobileMenuItem({
  href,
  title,
  children,
  onClose,
}: {
  href: string;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClose}
      className={cn(
        'block p-4 rounded-lg transition-colors',
        'hover:bg-gray-100 focus:bg-gray-100'
      )}
    >
      <div className='font-medium text-foreground'>{title}</div>
      <p className='text-sm text-muted-foreground mt-1'>{children}</p>
    </Link>
  );
}
