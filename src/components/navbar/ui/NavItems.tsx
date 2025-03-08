'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

const components: { title: string; href: string; description: string }[] = [
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

export function NavItems() {
  return (
    <NavigationMenu className='hidden lg:flex items-center gap-12'>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Genero</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className='grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]'>
              <li className='row-span-3'>
                <NavigationMenuLink asChild>
                  <Link
                    className='relative flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md'
                    href='/products'
                  >
                    <Image
                      src='https://images.pexels.com/photos/1884579/pexels-photo-1884579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                      alt='Menu'
                      fill
                      className='object-cover rounded-md'
                    />
                    <div className='absolute bottom-4 left-4 right-4 p-4 bg-black bg-opacity-50 rounded-md'>
                      <div className='mb-2 text-lg font-medium text-white'>
                        Ver todo
                      </div>
                      <p className='text-sm leading-tight text-white'>
                        Revisa toda la ropa de ultima moda
                      </p>
                    </div>
                  </Link>
                </NavigationMenuLink>
              </li>
              <ListItem href='/gender/men' title='Hombres 👨🏻'>
                Descubre nuestra exclusiva colección de moda masculina.
              </ListItem>
              <ListItem href='/gender/women' title='Mujeres 👩🏻‍🦰'>
                Explora las últimas tendencias en moda femenina.
              </ListItem>
              <ListItem href='/gender/kid' title='Niños 👦🏻'>
                Encuentra ropa cómoda y moderna para los más pequeños.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Categorias</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] '>
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className='text-sm font-medium leading-none'>{title}</div>
          <p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';
