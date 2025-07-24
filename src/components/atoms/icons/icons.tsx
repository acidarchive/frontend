import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Command,
  CreditCard,
  LayoutDashboard,
  type LucideIcon,
  RefreshCw,
  UserCircle,
  X,
} from 'lucide-react';

export type Icon = LucideIcon;

export const Icons = {
  dashboard: LayoutDashboard,
  billing: CreditCard,
  refreshCw: RefreshCw,
  logo: Command,
  logout: X,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  chevronDown: ChevronDown,
  userCircle: UserCircle,
};
