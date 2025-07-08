import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { useRouter } from 'next/navigation';

import { Avatar } from '@/app/components/atoms/avatar';
import { handleSignOut } from '@/app/lib/cognito-actions';
import { useUser } from '@/context/user-context';

export type AuthUser = {
  username: string;
  email?: string;
  name?: string;
  image?: string;
  isAdmin: boolean;
};

export interface UserMenuProps {
  user: AuthUser;
}
export function UserMenu({ user }: UserMenuProps) {
  const router = useRouter();
  const { refreshUser } = useUser();

  const handleSignOutClick = async () => {
    await handleSignOut();
    await router.push('/');
    await refreshUser();
  };

  return (
    <Menu as="div" className="relative ml-3">
      <MenuButton className="relative flex rounded-full bg-white text-sm">
        <span className="absolute -inset-1.5" />
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-900 hover:text-gray-500 hover:cursor-pointer">
            {user.username}
          </span>
          <Avatar image={user.image} username={user.username} />
        </div>
      </MenuButton>
      <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5">
        <MenuItem>
          <button
            onClick={handleSignOutClick}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Sign out
          </button>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}
