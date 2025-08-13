import { cookies } from 'next/headers';
import Link from 'next/link';

import { Icons } from '@/components/atoms/icons';
import { PatternEditorLayout } from '@/components/layouts/pattern-editor-layout/pattern-editor-layout';
import { Button } from '@/components/ui/button';
import { getTB303PatternById } from '@/dal';
import { PatternEditor } from '@/features/pattern-editor';

interface TB303EditPageProps {
  params: Promise<{ uuid: string }>;
}

export default async function TB303EditPage({ params }: TB303EditPageProps) {
  const { uuid } = await params;

  const pattern = await getTB303PatternById(uuid, {
    cookies,
  });

  return (
    <PatternEditorLayout
      title="Edit TB303 Pattern"
      description="You can edit your TB-303 pattern here."
      actions={
        <Link href={`/dashboard/tb303`} passHref>
          <Button>
            <Icons.chevronLeft className="h-4 w-4" />
            Back
          </Button>
        </Link>
      }
    >
      <PatternEditor pattern={pattern} />
    </PatternEditorLayout>
  );
}
