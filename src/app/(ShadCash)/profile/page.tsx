import { auth } from '@/auth.config';
import { Separator } from '@/components';
import { ProfileForm } from '@/components/profile/profileForm';

export default async function ProfilePage() {
  const session = await auth();
  const profileImage =
    session?.user?.image || session!.user!.name![0].toUpperCase();
  return (
    <div className='space-y-6'>
      <div>
        <h3 className='text-lg font-medium'>Perfil</h3>
        <p className='text-sm text-muted-foreground'>
          Así es como te verán los demás en el sitio.
        </p>
      </div>
      <Separator />
      <ProfileForm
        name={session!.user!.name!}
        email={session!.user!.email!}
        image={profileImage}
      />
    </div>
  );
}
