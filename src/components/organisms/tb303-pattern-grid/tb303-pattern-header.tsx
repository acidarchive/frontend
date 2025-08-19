import { GridInput } from '@/components/atoms/grid-input';
import {
  pattern_author_validation,
  pattern_title_validation,
} from '@/utils/input-validations';

interface TB303PatternHeaderProps {
  readonly?: boolean;
}

export function TB303PatternHeader({
  readonly = false,
}: TB303PatternHeaderProps) {
  return (
    <div className="divide-y border-b">
      <div className="grid grid-cols-18 items-center py-2">
        <span className="col-span-2 font-medium px-4 text-sm">Title</span>
        <div className="col-span-16 pr-4">
          <GridInput {...pattern_title_validation} disabled={readonly} />
        </div>
      </div>

      <div className="grid grid-cols-18 items-center py-2">
        <span className="col-span-2 font-medium px-4 text-sm">Author</span>
        <div className="col-span-16 pr-4">
          <GridInput {...pattern_author_validation} disabled={readonly} />
        </div>
      </div>
    </div>
  );
}
