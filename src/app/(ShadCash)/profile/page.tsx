import { auth } from '@/auth.config';
import { ProfileForm } from '@/components';
import { Separator } from '@/components/ui/separator';

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    return <div>No autenticado</div>;
  }

  const initialImage =
    session.user.image || session.user.name?.[0].toUpperCase() || 'U';

  return (
    <div className='space-y-6'>
      <div>
        <h3 className='text-lg font-medium'>Perfil</h3>
        <p className='text-sm text-muted-foreground'>
          Así es como te ven los demás en el sitio
        </p>
      </div>
      <Separator />
      <ProfileForm
        userId={session.user.id}
        name={session.user.name || ''}
        email={session.user.email || ''}
        image={initialImage}
      />
    </div>
  );
}
