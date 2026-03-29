import { Icons } from '@/components/atoms/icons';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface FormAlertProps {
  message?: string;
  title?: string;
  variant?: 'default' | 'destructive';
  className?: string;
}

export function FormAlert({
  message,
  title,
  variant,
  className,
}: FormAlertProps) {
  if (!message) return null;

  return (
    <Alert variant={variant} className={className}>
      <Icons.AlertCircle className="size-4" />
      {title && <AlertTitle>{title}</AlertTitle>}
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}
