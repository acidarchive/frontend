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
      <div className="px-2 py-2 sm:grid sm:grid-cols-8 sm:gap-2 sm:px-6 sm:items-center">
        <dt className="text-sm font-semibold text-gray-900 leading-5">
          Title:
        </dt>
        <dd className="sm:col-span-2">
          <span className="text-gray-700 text-sm leading-5 block">{title}</span>
        </dd>
      </div>

      <div className="px-2 py-2 sm:grid sm:grid-cols-8 sm:gap-2 sm:px-6 sm:items-center">
        <dt className="text-sm font-semibold text-gray-900 leading-5">
          Author:
        </dt>
        <dd className="sm:col-span-2">
          <span className="text-gray-700 text-sm leading-5 block">
            {author}
          </span>
        </dd>
      </div>
    </dl>
  );
}
