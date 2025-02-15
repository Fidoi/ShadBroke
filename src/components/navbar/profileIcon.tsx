import { auth } from '@/auth.config';
import ProfileIconClient from './profileIconClient';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { CircleUserRound } from 'lucide-react';
import Link from 'next/link';

export default async function ProfileIcon() {
  const session = await auth();

  if (!session) {
    return (
      <Avatar className='relative ml-3'>
        <AvatarFallback>
          <Link href='auth/login'>
            <CircleUserRound className='w-6 h-6' />
          </Link>
        </AvatarFallback>
      </Avatar>
    );
  }

  return <ProfileIconClient session={session} />;
}
