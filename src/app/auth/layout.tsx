import { auth } from '@/auth.config';
import { redirect } from 'next/navigation';

export default async function LayoutMain({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (session?.user) {
    redirect('/');
  }
  return (
    <>
      <div>{children}</div>
    </>
  );
}
