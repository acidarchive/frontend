import Link from 'next/link';

import { Icons } from '@/components/atoms/icons';
import { PatternEditorLayout } from '@/components/layouts/pattern-editor-layout/pattern-editor-layout';
import { Button } from '@/components/ui/button';
import { PatternTB303View } from '@/features/pattern-tb303-view';

interface ViewTB303PatternPage {
  params: Promise<{ uuid: string }>;
}
export default async function ViewTB303PatternPage({
  params,
}: ViewTB303PatternPage) {
  const { uuid } = await params;

  return (
    <PatternEditorLayout
      title="View TB-303 Pattern"
      description="You can view your TB-303 pattern here."
      actions={
        <Link href={`/dashboard/tb303/${uuid}/edit`}>
          <Button>
            <Icons.pencil className="h-4 w-4" />
            Edit
          </Button>
        </Link>
      }
    >
      <PatternTB303View patternId={uuid} />
    </PatternEditorLayout>
  );
}
