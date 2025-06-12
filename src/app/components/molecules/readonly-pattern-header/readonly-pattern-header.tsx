import { TB303PatternAuthor, TB303PatternTitle } from '@/api/generated/model';

export interface ReadonlyPatternHeaderProps {
  title?: TB303PatternTitle;
  author?: TB303PatternAuthor;
}

export function ReadonlyPatternHeader({
  title,
  author,
}: ReadonlyPatternHeaderProps) {
  return (
    <dl className="divide-y divide-gray-200 border-b border-gray-200">
      <div className="px-2 py-2 sm:grid sm:grid-cols-8 sm:gap-2 sm:px-6">
        <dt className="text-sm font-semibold text-gray-900 flex items-center">
          Title:
        </dt>
        <dd className="mt-1 sm:col-span-2 sm:mt-0">
          <span className="text-gray-700">{title}</span>
        </dd>
      </div>

      <div className="px-2 py-2 sm:grid sm:grid-cols-8 sm:gap-2 sm:px-6">
        <dt className="text-sm font-semibold text-gray-900 flex items-center">
          Author:
        </dt>
        <dd className="mt-1 sm:col-span-2 sm:mt-0">
          <span className="text-gray-700">{author}</span>
        </dd>
      </div>
    </dl>
  );
}
