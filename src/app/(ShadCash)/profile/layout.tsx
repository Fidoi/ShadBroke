import { auth } from '@/auth.config';
import { Separator, SidebarNav } from '@/components';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Perfil',
  description: 'Advanced form example using react-hook-form and Zod.',
};

const sidebarNavItems = [
  {
    title: 'Perfil',
    href: '/profile',
  },
  {
    title: 'Direccion',
    href: '/profile/directions',
  },
  {
    title: 'Compras',
    href: '/profile/shopping',
  },
];

const sideBarNavItemsAdmin = [
  {
    title: 'Usuarios',
    href: '/profile/admin/users',
  },
  {
    title: 'Graficos',
    href: '/profile/admin/charts',
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
        <h2 className='text-2xl font-bold mb-4'>Configuración</h2>
        <SidebarNav items={sidebarNavItems} />
        {session.user.role == 'admin' && (
          <>
            <SidebarNav items={sideBarNavItemsAdmin} />
          </>
        )}
        <div className='mt-6'>{children}</div>
      </div>
      <div className='hidden md:flex min-h-screen w-full justify-center'>
        <div className='w-full max-w-7xl px-4 py-10'>
          <div className='space-y-6'>
            <div className='space-y-0.5'>
              <h2 className='text-2xl font-bold tracking-tight'>
                Configuración
              </h2>
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
                    <SidebarNav items={sideBarNavItemsAdmin} />
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
