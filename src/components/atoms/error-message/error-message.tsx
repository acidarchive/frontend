import { Icons } from '@/components/atoms/icons';

export interface ErrorMessageProps {
  message?: string;
}

export function ErrorMessage({ message }: { message: string }) {
  if (!message) return;

  return (
    <div className="rounded-md bg-red-50 p-4 mb-4">
      <div className="flex">
        <div className="shrink-0">
          <Icons.xCircle aria-hidden="true" className="size-5 text-red-400" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">{message}</h3>
        </div>
      </div>
    </div>
  );
}
