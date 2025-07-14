import { useGetTb303Pattern } from '@/api/generated/acid';
import { ReadonlyTB303PatternDetails } from '@/components/organisms/readonly-tb303-pattern-details';
import { ReadonlyTB303PatternGrid } from '@/components/organisms/readonly-tb303-pattern-grid';

interface PatternTB303ViewProps {
  patternId?: string;
}

export function PatternTB303View({ patternId }: PatternTB303ViewProps) {
  const { data: pattern } = useGetTb303Pattern(patternId!);

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
