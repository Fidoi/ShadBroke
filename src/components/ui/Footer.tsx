import { Mail, MapPin, Phone } from 'lucide-react';
import { Separator } from './separator';
import Image from 'next/image';

export const Footer = () => {
  const currentYear: number = new Date().getFullYear();
  return (
    <footer className='bg-primary py-10 px-6 text-white'>
      <div className='max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-6 gap-6'>
        <Image
          src='/shadbroke.svg'
          alt='Logo'
          className='hidden md:block items-center text-2xl font-bold rounded-full'
          width={200}
          height={200}
        />

        <div>
          <h2 className='text-xl font-bold'>
            Shad<span className='text-gray-400'>Broke</span>
          </h2>
          <div className='mt-4 space-y-2'>
            <p className='flex items-center'>
              <Phone className='mr-2' /> +569 74358746
            </p>
            <p className='flex items-center'>
              <Mail className='mr-2' /> information@shadbroke.com
            </p>
            <p className='flex items-center'>
              <MapPin className='mr-2' /> Avenida O&apos;Higgins 1234, Santiago,
              Chile
            </p>
          </div>
        </div>

        <Separator className='my-6 bg-slate-300 md:hidden' />
        <div className='flex md:flex-col sm:flex-row  justify-evenly w-full'>
          <h3 className='font-semibold mb-3'>Links</h3>
          <ul className='space-y-2'>
            <li>Lista de productos</li>
            <li>Seguimiento de pedidos</li>
            <li>Guía de productos</li>
            <li>Carrito de compras</li>
          </ul>
        </div>

        <Separator className='my-6 bg-slate-300 md:hidden' />
        <div className='flex md:flex-col sm:flex-row justify-evenly w-full'>
          <h3 className='font-semibold mb-3'>Soporte</h3>
          <ul className='space-y-2'>
            <li>Acerca de nosotros</li>
            <li>Política de privacidad</li>
            <li>Política de devoluciones</li>
            <li>Centro de ayuda</li>
          </ul>
        </div>

        <Separator className='my-6 bg-slate-300 md:hidden ' />
        <div className='flex md:flex-col sm:flex-row justify-evenly w-full'>
          <h3 className='font-semibold mb-3'>Categorias:</h3>

          <ul className='space-y-2 '>
            <li>Hoodies</li>
            <li>Gorras</li>
            <li>Pantalones</li>
            <li>Poleras</li>
          </ul>
        </div>

        <Separator className='my-6 bg-slate-300 md:hidden' />
        <div>
          <div className='flex flex-col '>
            <span className='font-semibold'>Tipos de pago:</span>
            <Image
              src='/webpay.png'
              height={20}
              width={150}
              alt='webpay icon'
            />
          </div>

          <div className='flex space-x-4 mt-9 md:mt-0 flex-col'>
            <span className='font-semibold'>Conecta con nosotros:</span>
            <div className='flex flex-col text-whit gap-y-4'>
              <span className='flex gap-x-2'>
                <Image
                  src='/icons/x.svg'
                  alt='Twitter'
                  width={24}
                  height={24}
                />
                Twitter
              </span>

              <span className='flex gap-x-2'>
                <Image
                  src='/icons/instagram.svg'
                  alt='Twitter'
                  width={24}
                  height={24}
                />
                Instagram
              </span>

              <span className='flex gap-x-2'>
                <Image
                  src='/icons/facebook.svg'
                  alt='Twitter'
                  width={24}
                  height={24}
                />
                Facebook
              </span>
            </div>
          </div>
        </div>
      </div>
      <Separator className='my-6 bg-slate-300' />
      <div className='text-center text-xs text-gray-500 '>
        Copyright © {currentYear} ShadBroke. All Rights Reserved.
      </div>
    </footer>
  );
};
