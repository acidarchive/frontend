import { useRouter } from 'next/navigation';

import { useUser } from '@/context/user-context';
import { handleSignOut } from '@/lib/cognito-actions';

interface SignOutButtonProps {
  children: React.ReactNode;
}
export function SignOutButton({ children }: SignOutButtonProps) {
  const router = useRouter();
  const { refreshUser } = useUser();

  const handleSignOutClick = async () => {
    await handleSignOut();
    await router.push('/');
    await refreshUser();
  };
  return (
    <button onClick={handleSignOutClick} className="sign-out-button">
      {children}
    </button>
  );
}
