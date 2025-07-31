import { PageContainer } from '../page-container';

interface PatternEditorLayoutProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}

export function PatternEditorLayout({
  title,
  description,
  children,
  actions,
}: PatternEditorLayoutProps) {
  return (
    <PageContainer scrollable={false}>
      <div className="flex flex-1 flex-col gap-8 max-w-8xl mx-auto">
        <div className="flex items-start justify-between gap-2 max-w-7xl">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
            {description && (
              <p className="text-muted-foreground">{description}</p>
            )}
          </div>
          {actions}
        </div>
        <div className="flex-1 max-w-7xl">{children}</div>
      </div>
    </PageContainer>
  );
}
