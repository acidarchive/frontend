import { PageContainer } from '@/components/layouts/page-container';
import { PatternTB303Form } from '@/components/organisms/pattern-tb303-form';

export default function AddTB303PatternPage() {
  return (
    <PageContainer scrollable={false}>
      <div className="flex flex-1 flex-col gap-8 max-w-8xl mx-auto">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-semibold tracking-tight">
              Create TB-303 Pattern
            </h2>
            <p className="text-muted-foreground">
              You can create TB-303 pattern here .
            </p>
          </div>
        </div>
        <PatternTB303Form />
      </div>
    </PageContainer>
  );
}
