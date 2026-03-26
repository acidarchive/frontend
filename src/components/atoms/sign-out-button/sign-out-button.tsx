import { useRouter } from 'next/navigation';

import { useUser } from '@/context/user-context';

interface SignOutButtonProps {
  children: React.ReactNode;
}
export function SignOutButton({ children }: SignOutButtonProps) {
  const router = useRouter();
  const { signOut } = useUser();

  const handleSignOutClick = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <button onClick={handleSignOutClick} className="sign-out-button">
      {children}
    </button>
  );
}
