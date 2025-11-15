import { Icons } from '@/components/atoms/icons';
import {
  Alert as AlertUI,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert';

interface AlertProps {
  variant?: 'default' | 'destructive';
  title?: string;
  className?: string;
  children?: React.ReactNode;
}

export function Alert({ variant, title, className, children }: AlertProps) {
  if (!children) return;

  return (
    <AlertUI variant={variant} className={className}>
      <Icons.alertCircle className="h-4 w-4" />
      {title && <AlertTitle>{title}</AlertTitle>}
      <AlertDescription>{children}</AlertDescription>
    </AlertUI>
  );
}
