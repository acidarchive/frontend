import { Loader } from '@/components/atoms/loader';

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 min-h-[450px]">
      <Loader />
    </div>
  );
}
