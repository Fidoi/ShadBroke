import { Avatar, AvatarFallback } from '../ui/avatar';
import Image from 'next/image';
import { CircleUserRound, Crown } from 'lucide-react';
import { Session } from 'next-auth';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

interface ProfileIconClientProps {
  session: Session | null;
  className?: string;
}

export const ProfileAvatar = ({
  session: initialSession,
  className,
}: ProfileIconClientProps) => {
  const { data: session } = useSession();
  const currentSession = session || initialSession;

  if (!currentSession) {
    return (
      <Avatar className='relative '>
        <AvatarFallback>
          <Link href='/auth/login'>
            <CircleUserRound className='w-6 h-6' />
          </Link>
        </AvatarFallback>
      </Avatar>
    );
  }

  const isAdmin = currentSession.user?.role === 'admin';

  return (
    <div className='relative inline-block cursor-pointer'>
      <Avatar className={className}>
        {currentSession.user?.image ? (
          <Image
            src={currentSession.user.image}
            alt={currentSession.user.name || 'User'}
            fill
            className='rounded-full object-cover'
          />
        ) : (
          <AvatarFallback className='bg-gray-500 text-white cursor-pointer'>
            {currentSession.user?.name?.[0]?.toUpperCase() ?? 'U'}
          </AvatarFallback>
        )}
      </Avatar>
      {isAdmin && (
        <Crown
          className='absolute -top-1 -right-1 w-6 h-6 text-yellow-500 z-20'
          fill='currentColor'
          stroke='black'
          strokeWidth={2}
        />
      )}
    </div>
  );
};
