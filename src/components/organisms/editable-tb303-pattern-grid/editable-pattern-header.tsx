import { GridInput } from '@/components/atoms/grid-input';
import {
  pattern_author_validation,
  pattern_title_validation,
} from '@/utils/input-validations';

export function EditablePatternHeader() {
  return (
    <dl className="divide-y border-b">
      <div className="px-2 py-2 sm:grid sm:grid-cols-8 sm:gap-2 sm:px-6">
        <dt className="text-sm font-semibold flex items-center">Title:</dt>
        <dd className="mt-1 sm:col-span-2 sm:mt-0">
          <GridInput {...pattern_title_validation} />
        </dd>
      </div>

      <div className="px-2 py-2 sm:grid sm:grid-cols-8 sm:gap-2 sm:px-6">
        <dt className="text-sm font-semibold flex items-center">Author:</dt>
        <dd className="mt-1 sm:col-span-2 sm:mt-0">
          <GridInput {...pattern_author_validation} />
        </dd>
      </div>
    </dl>
  );
}
