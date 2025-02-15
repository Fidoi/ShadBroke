'use client';

import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Flag } from 'lucide-react';
import { Button } from '../ui';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function MobileMenu({ isOpen, onClose }: any) {
  const navItems = [
    { lable: 'Home', route: '/' },
    { lable: 'Contact', route: '' },
    { lable: 'About', route: '' },
    { lable: 'Sign Up', route: '/' },
  ];

  return (
    <div
      className={`md:hidden fixed top-0 left-0 w-full h-full bg-white z-50 transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out`}
    >
      <div className='p-4 space-y-4'>
        {navItems.map((item) => (
          <Link
            key={item.lable}
            href={item.route}
            className='block p-2 text-lg'
            onClick={onClose}
          >
            {item.lable}
          </Link>
        ))}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='link' className='px-0'>
              English
              <Flag className='ml-2' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>English</DropdownMenuItem>
            <DropdownMenuItem>Arabic</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
