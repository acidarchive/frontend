import { NavItem } from '@/types';

export const navItems: NavItem[] = [
  {
    title: 'Home',
    url: '/',
    icon: 'home',
    isActive: false,
    items: [],
  },
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: 'dashboard',
    isActive: false,
    items: [],
  },
  {
    title: 'Patterns',
    url: '',
    icon: 'billing',
    isActive: true,

    items: [
      {
        title: 'TB-303',
        url: '/dashboard/tb303',
      },
      {
        title: 'TR-606',
        url: '/dashboard/tr606',
      },
    ],
  },
];
