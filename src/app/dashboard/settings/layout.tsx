import { Icons } from '@/components/atoms/icons';
import { SettingsNav } from '@/components/molecules/settings-nav';
import { Separator } from '@/components/ui/separator';

const SETTINGS_NAV_ITEMS = [
  {
    title: 'Avatar',
    href: '/dashboard/settings/avatar',
    icon: <Icons.UserSharp className="size-6" />,
  },
  {
    title: 'Password',
    href: '/dashboard/settings/password',
    icon: <Icons.LockSharp className="size-6" />,
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <div className="flex justify-center">
      <div className="container flex flex-1 flex-col overflow-hidden p-4 md:p-6 max-w-7xl">
        <div className="flex-none space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings and preferences.
          </p>
        </div>
        <Separator className="my-6 flex-none" />
        <div className="flex flex-1 flex-col gap-6 overflow-hidden lg:flex-row">
          <aside className="flex-none lg:w-48">
            <SettingsNav items={SETTINGS_NAV_ITEMS} />
          </aside>
          {children}
        </div>
      </div>
    </div>
  );
}
