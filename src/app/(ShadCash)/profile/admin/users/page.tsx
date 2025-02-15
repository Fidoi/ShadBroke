export const revalidate = 0;
import { getPaginatedUsers } from '@/actions';
import { UsersTable } from '@/components';

import { redirect } from 'next/navigation';

export default async function OrdersPage() {
  const { ok, users = [] } = await getPaginatedUsers();

  if (!ok) {
    redirect('/profile');
  }

  return (
    <>
      <div>
        <UsersTable users={users} />
      </div>
    </>
  );
}
