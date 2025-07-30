import { Icons } from '@/components/atoms/icons';

export interface SuccessMessageProps {
  message?: string;
}

export function SuccessMessage({ message }: { message: string }) {
  if (!message) return;

  return (
    <div className="rounded-md bg-green-50 p-4 mb-4">
      <div className="flex">
        <div className="shrink-0">
          <Icons.checkCircle
            aria-hidden="true"
            className="size-5 text-green-400"
          />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-green-800">{message}</h3>
        </div>
      </div>
    </div>
  );
}
