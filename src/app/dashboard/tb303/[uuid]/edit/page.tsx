'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { Icons } from '@/components/atoms/icons';
import { PatternEditorLayout } from '@/components/layouts/pattern-editor-layout/pattern-editor-layout';
import { Button } from '@/components/ui/button';
import { PatternEditor } from '@/features/pattern-editor';

export default function TB303EditPage() {
  const params = useParams();
  const uuid = params.uuid as string;

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
      <PatternEditor patternId={uuid} />
    </PatternEditorLayout>
  );
}
