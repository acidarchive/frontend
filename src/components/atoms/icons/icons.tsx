import {
  ChevronDown,
  ChevronLeft,
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
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  chevronDown: ChevronDown,
  userCircle: UserCircle,
};
