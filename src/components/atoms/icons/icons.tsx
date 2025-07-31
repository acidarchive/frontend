import {
  AlertCircle,
  CheckCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Command,
  CreditCard,
  House,
  LayoutDashboard,
  type LucideIcon,
  Menu,
  Pencil,
  RefreshCw,
  UserCircle,
  X,
  XCircle,
} from 'lucide-react';

export type Icon = LucideIcon;

export const Icons = {
  dashboard: LayoutDashboard,
  billing: CreditCard,
  refreshCw: RefreshCw,
  logo: Command,
  x: X,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  chevronDown: ChevronDown,
  userCircle: UserCircle,
  home: House,
  menu: Menu,
  xCircle: XCircle,
  checkCircle: CheckCircle,
  alertCircle: AlertCircle,
  pencil: Pencil,
};
