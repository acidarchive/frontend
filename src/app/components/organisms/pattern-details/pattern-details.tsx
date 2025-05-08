import { CalendarDaysIcon, UserCircleIcon } from '@heroicons/react/20/solid';

export function PatternDetails() {
  return (
    <div className="bg-gray-50 shadow-xs ring-1 ring-gray-900/5">
      <dl className="flex flex-wrap">
        <div className="flex w-full flex-none gap-x-4 px-6 pt-6">
          <dt className="flex-none">
            <UserCircleIcon
              aria-hidden="true"
              className="h-6 w-5 text-gray-400"
            />
          </dt>
          <dd className="text-sm/6 font-medium text-gray-900">demouser</dd>
        </div>

        <div className="mt-4 flex w-full flex-none gap-x-4 px-6 pb-6">
          <dt className="flex-none">
            <span className="sr-only">Date</span>
            <CalendarDaysIcon
              aria-hidden="true"
              className="h-6 w-5 text-gray-400"
            />
          </dt>
          <dd className="text-sm/6 text-gray-500">
            <time dateTime="2025-04-30">April 30, 2025</time>
          </dd>
        </div>
      </dl>
    </div>
  );
}
