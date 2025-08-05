import { cookies } from 'next/headers';
import Link from 'next/link';

import { Icons } from '@/components/atoms/icons';
import { PatternEditorLayout } from '@/components/layouts/pattern-editor-layout/pattern-editor-layout';
import { PatternTB303View } from '@/components/organisms/pattern-tb303-view';
import { Button } from '@/components/ui/button';
import { getTB303PatternById } from '@/dal';

interface ViewTB303PatternPage {
  params: Promise<{ uuid: string }>;
}
export default async function ViewTB303PatternPage({
  params,
}: ViewTB303PatternPage) {
  const { uuid } = await params;
  const pattern = await getTB303PatternById(uuid, { cookies });

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
      <PatternTB303View pattern={pattern} />
    </PatternEditorLayout>
  );
}
