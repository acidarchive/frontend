'use client';
import { useRouter } from 'next/navigation';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
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
    <DropdownMenuItem onClick={handleSignOutClick}>{children}</DropdownMenuItem>
  );
}
