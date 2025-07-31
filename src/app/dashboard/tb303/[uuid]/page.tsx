'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { Icons } from '@/components/atoms/icons';
import { PatternEditorLayout } from '@/components/layouts/pattern-editor-layout/pattern-editor-layout';
import { PatternTB303View } from '@/components/organisms/pattern-tb303-view';
import { Button } from '@/components/ui/button';

export default function ViewTB303PatternPage() {
  const params = useParams();
  const uuid = params.uuid as string;

  return (
    <PatternEditorLayout
      title="View TB303 Pattern"
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
