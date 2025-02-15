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
        {/* Logo y contacto */}
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

        {/* Links */}
        <Separator className='my-6 bg-slate-300 md:hidden' />
        <div className='flex md:flex-col sm:flex-row  justify-evenly w-full'>
          <h3 className='font-semibold mb-3'>Links</h3>
          <ul className='space-y-2'>
            <li>Products List</li>
            <li>Order Tracking</li>
            <li>Products Guide</li>
            <li>Shopping Cart</li>
            <li>Tech Blog</li>
          </ul>
        </div>

        {/* Soporte */}
        <Separator className='my-6 bg-slate-300 md:hidden' />
        <div className='flex md:flex-col sm:flex-row justify-evenly w-full'>
          <h3 className='font-semibold mb-3'>Supports</h3>
          <ul className='space-y-2'>
            <li>About Us</li>
            <li>Privacy Policy</li>
            <li>Return Policy</li>
            <li>Help Centre</li>
            <li>Store Locations</li>
            <li>Careers</li>
          </ul>
        </div>

        {/* Categorías */}
        <Separator className='my-6 bg-slate-300 md:hidden ' />
        <div className='flex md:flex-col sm:flex-row justify-evenly w-full'>
          <h3 className='font-semibold mb-3'>Categories:</h3>

          <ul className='space-y-2 '>
            <li>Computers & Tablets</li>
            <li>Mobile Phones & Accessories</li>
            <li>TV & Home Theater</li>
            <li>Audio & Headphones</li>
            <li>Cameras & Camcorders</li>
            <li>Gaming Equipment</li>
            <li>Home Appliances</li>
          </ul>
        </div>
        {/* Pagos y redes sociales */}
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
            <div className='flex flex-col'>
              <span>Twitter</span>
              <span>Instagram</span>
              <span>Facebook</span>
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
