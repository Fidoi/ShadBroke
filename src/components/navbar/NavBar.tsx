import ProfileIcon from './profileIcon';
import { MobileNav } from './MobileNav';
import { NavItems } from './ui/NavItems';
import Link from 'next/link';
import { Cart } from '../shoping/Cart';
import Image from 'next/image';
import { Button } from '../ui';
import SearchProducts from './ui/SearchProducts';

export default function NavBar() {
  return (
    <nav className='border-b'>
      <div className='bg-black '>
        <div className='flex lg:h-12 items-center justify-center px-5 py-3'>
          <p className='text-sm text-white py-3'>
            Oferta de verano en todas las compras sobre $20.000!: ¡Envio Gratis!
          </p>
          <span>
            <Button
              type='button'
              className='text-sm font-semibold underline ml-3'
            >
              Comprar!
            </Button>
          </span>
        </div>
      </div>

      <Link
        className='md:hidden text-2xl font-bold items-center justify-center flex'
        href={'/'}
      >
        <Image src='/shadbroke.svg' alt='Descripción' width={50} height={50} />
        ShadBroke
      </Link>

      <div className='mx-auto flex lg:max-w-[1440px] justify-between px-4 md:px-[135px] pb-4 pt-4 md:max-w-full'>
        <div className='flex items-center gap-4 '>
          <MobileNav />
          <div className='flex flex-row justify-center items-center'>
            <Image
              src='/shadbroke.svg'
              alt='Descripción'
              className='hidden md:block text-2xl font-bold  flex-row'
              width={50}
              height={50}
            />
            <Link
              className='hidden md:block text-2xl font-bold  flex-row'
              href={'/'}
            >
              ShadBroke
            </Link>
          </div>
        </div>
        <NavItems />
        <div className='flex items-center gap-6 justify-center'>
          <div className='flex flex-row items-center gap-2 rounded  p-1 '>
            <SearchProducts />
          </div>
          <div className='flex items-center gap-4 justify-end'>
            <ProfileIcon />
            <Cart />
          </div>
        </div>
      </div>
    </nav>
  );
}
