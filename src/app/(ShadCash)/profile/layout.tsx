import { auth } from '@/auth.config';
import { Separator, SidebarNav } from '@/components';
import {
  ChartNoAxesCombined,
  Crown,
  ListOrdered,
  PackageSearch,
  Settings,
  UserRoundPen,
  Users,
} from 'lucide-react';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Perfil',
  description: 'Vista previa del perfil.',
};

const sidebarNavItems = [
  {
    title: 'Perfil',
    icon: <UserRoundPen />,
    href: '/profile',
  },
  {
    title: 'Pedidos',
    icon: <ListOrdered />,
    href: '/profile/shopping',
  },
];

const sideBarNavItemsAdmin = [
  {
    title: 'Ventas',
    icon: <ChartNoAxesCombined />,
    href: '/profile/admin/charts',
  },
  {
    title: 'Usuarios',
    icon: <Users />,
    href: '/profile/admin/users',
  },

  {
    title: 'Productos',
    icon: <PackageSearch />,
    href: '/profile/admin/products',
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default async function SettingsLayout({
  children,
}: SettingsLayoutProps) {
  const session = await auth();
  if (!session?.user) {
    redirect('/');
  }
  return (
    <>
      <div className='md:hidden p-4'>
        <div className='flex flex-row items-center gap-x-2'>
          <Settings />
          <h2 className='text-2xl font-bold mb-4'>Configuración</h2>
        </div>

        <div className='overflow-x-auto whitespace-nowrap scrollbar-hide'>
          <SidebarNav items={sidebarNavItems} />
        </div>

        {(session.user.role === 'admin' ||
          session.user.role === 'supervisor') && (
          <>
            <div className='flex items-center justify-center gap-x-3'>
              <Crown
                className='text-yellow-500'
                fill='currentColor'
                stroke='black'
              />
              <span className='font-medium'>Admin Panel</span>
            </div>

            <div className='overflow-x-auto whitespace-nowrap scrollbar-hide'>
              <SidebarNav items={sideBarNavItemsAdmin} />
            </div>
          </>
        )}

        <div className='mt-6'>{children}</div>
      </div>

      <div className='hidden md:flex min-h-screen w-full justify-center'>
        <div className='w-full max-w-7xl px-4 py-10'>
          <div className='space-y-6'>
            <div className='space-y-0.5'>
              <div className='flex flex-row items-center gap-x-2'>
                <Settings />
                <h2 className='text-2xl font-bold tracking-tight'>
                  Configuración
                </h2>
              </div>
              <p className='text-muted-foreground'>
                Administra la configuración de tu cuenta y establece
                preferencias
              </p>
            </div>

            <Separator className='my-6' />

            <div className='flex flex-col lg:flex-row gap-12'>
              <aside className='lg:w-1/5'>
                <SidebarNav items={sidebarNavItems} />
                {(session.user.role === 'admin' ||
                  session.user.role === 'supervisor') && (
                  <>
                    <Separator className='my-6' />
                    <div className='flex md:flex-row lg:flex-col gap-x-3'>
                      <div className='flex items-center justify-center gap-x-3 lg:mb-3'>
                        <Crown
                          className='text-yellow-500'
                          fill='currentColor'
                          stroke='black'
                        />
                        <span className='font-medium'>Admin Panel</span>
                      </div>

                      <SidebarNav items={sideBarNavItemsAdmin} />
                    </div>
                  </>
                )}
              </aside>

              <main className='flex-1 lg:max-w-full'>{children}</main>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
