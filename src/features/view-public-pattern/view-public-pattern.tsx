import { PatternTB303Viewer } from '@/components/organisms/pattern-tb303-viewer';
import { TB303Pattern } from '@/types';

interface ViewPublicPatternProps {
  pattern: TB303Pattern;
}

export function ViewPublicPattern({ pattern }: ViewPublicPatternProps) {
  return <PatternTB303Viewer data={pattern} />;
}
