import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Icons } from '@/components/atoms/icons';

import { SettingsNav } from './settings-nav';

const navItems = [
  {
    title: 'Profile',
    href: '/settings/profile',
    icon: <Icons.userCircle className="size-4" />,
  },
  {
    title: 'Account',
    href: '/settings/account',
    icon: <Icons.settings className="size-4" />,
  },
  {
    title: 'Security',
    href: '/settings/security',
    icon: <Icons.keyRound className="size-4" />,
  },
];

const meta: Meta<typeof SettingsNav> = {
  title: 'Molecules/SettingsNav',
  component: SettingsNav,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof SettingsNav>;

export const Default: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/settings',
      },
    },
  },
  args: {
    items: navItems,
  },
};

export const ActiveItem: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/settings/account',
      },
    },
  },
  args: {
    items: navItems,
  },
};
