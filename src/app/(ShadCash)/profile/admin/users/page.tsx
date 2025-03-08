export const revalidate = 0;
import { getPaginatedUsers } from '@/actions';
import { UsersTable } from '@/components';
import { UserRoundSearch } from 'lucide-react';

import { redirect } from 'next/navigation';

export default async function OrdersPage() {
  const { ok, users = [] } = await getPaginatedUsers();

  if (!ok) {
    redirect('/profile');
  }

  return (
    <>
      <div className='container py-8'>
        <div className='flex gap-x-3'>
          <UserRoundSearch />
          <h1 className='text-2xl font-bold mb-4'>Gestion de usuarios</h1>
        </div>
        <UsersTable users={users} />
      </div>
    </>
  );
}
