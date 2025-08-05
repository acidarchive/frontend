import { TB303Pattern } from '@/api/generated/model';
import { ReadonlyTB303PatternDetails } from '@/components/organisms/readonly-tb303-pattern-details';
import { ReadonlyTB303PatternGrid } from '@/components/organisms/readonly-tb303-pattern-grid';

interface PatternTB303ViewProps {
  pattern: TB303Pattern;
}

export function PatternTB303View({ pattern }: PatternTB303ViewProps) {
  return (
    <div className="max-w-7xl">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:flex-1">
          <ReadonlyTB303PatternGrid pattern={pattern} />
        </div>
        <div className="lg:w-100 lg:flex-shrink-0">
          <ReadonlyTB303PatternDetails pattern={pattern} />
        </div>
      </div>
    </div>
  );
}
