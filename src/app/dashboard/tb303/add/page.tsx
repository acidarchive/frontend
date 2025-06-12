import Link from 'next/link';

import { PatternTB303Form } from '@/app/components/organisms/pattern-tb303-form';

export default function AddTB303PatternPage() {
  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8 py-6">
        <Link
          className="text-gray-600 hover:text-gray-900 font-semibold"
          href="/dashboard/tb303"
        >
          ⏴ Back
        </Link>
      </div>
      <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8">
        <PatternTB303Form />
      </div>
    </>
  );
}
