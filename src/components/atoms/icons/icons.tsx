import {
  ChevronDown,
  ChevronRight,
  Command,
  CreditCard,
  LayoutDashboard,
  type LucideIcon,
  UserCircle,
  X,
} from 'lucide-react';

export type Icon = LucideIcon;

export const Icons = {
  dashboard: LayoutDashboard,
  billing: CreditCard,

  logo: Command,
  logout: X,
  chevronRight: ChevronRight,
  chevronDown: ChevronDown,
  userCircle: UserCircle,
};
