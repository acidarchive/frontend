import Link from 'next/link';

import { Icons } from '@/components/atoms/icons';
import { PatternEditorLayout } from '@/components/layouts/pattern-editor-layout/pattern-editor-layout';
import { Button } from '@/components/ui/button';
import { PatternEditor } from '@/features/pattern-editor';

export default function AddTB303PatternPage() {
  return (
    <PatternEditorLayout
      title="Create TB303 Pattern"
      description="You can create TB-303 pattern here."
      actions={
        <Link href={`/dashboard/tb303`} passHref>
          <Button>
            <Icons.chevronLeft className="h-4 w-4" />
            Back
          </Button>
        </Link>
      }
    >
      <PatternEditor />
    </PatternEditorLayout>
  );
}
