'use client';

import { ErrorAlert } from '@/components/molecules/error-alert';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface BaseModalProps {
  isOpen?: boolean;
  title?: string;
  description?: string;
  error?: string;
  children: React.ReactNode;
  onSubmit?: () => void;
  onClose?: () => void;
  onReset?: () => void;
}

export function BaseModal({
  isOpen = true,
  onClose,
  onSubmit,
  onReset,
  title,
  description,
  error,
  children,
}: BaseModalProps) {
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[900px]">
        {title || description ? (
          <DialogHeader>
            {title && <DialogTitle>{title}</DialogTitle>}
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
        ) : undefined}
        {error && (
          <div className="mb-4">
            <ErrorAlert title="Error" message={error} />
          </div>
        )}

        <div>{children}</div>

        <DialogFooter>
          {onReset && (
            <Button type="button" variant="secondary" onClick={onReset}>
              Reset
            </Button>
          )}
          {onSubmit && <Button onClick={onSubmit}>Save</Button>}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
