import { Icons } from '@/components/atoms/icons';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const MAX_BARS = 16;

interface TB303BarTabsProps {
  barCount: number;
  activeIndex: number;
  readonly?: boolean;
  onSelect: (index: number) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
}

export function TB303BarTabs({
  barCount,
  activeIndex,
  readonly = false,
  onSelect,
  onAdd,
  onRemove,
}: TB303BarTabsProps) {
  return (
    <div className="border-b sm:grid sm:grid-cols-[1fr_repeat(17,_1fr)]">
      <div className="hidden sm:flex col-span-2 border-r py-2 px-4 items-center font-medium text-sm">
        bars
      </div>
      {Array.from({ length: barCount }, (_, index) => (
        <div key={index} className="relative group flex items-center justify-center py-1.5">
          <Button
            type="button"
            size={null}
            onClick={() => onSelect(index)}
            className={cn(
              'px-2 py-0.5 text-xs font-mono border transition-colors',
              index === activeIndex
                ? 'bg-foreground text-background border-foreground'
                : 'bg-transparent text-foreground border-border hover:border-foreground',
            )}
          >
            {index + 1}
          </Button>
          {!readonly && barCount > 1 && (
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-background border border-border text-muted-foreground hover:text-foreground hover:border-foreground opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
              aria-label={`Remove bar ${index + 1}`}
            >
              <Icons.XIcon />
            </button>
          )}
        </div>
      ))}
      {!readonly && barCount < MAX_BARS && (
        <div className="flex items-center justify-center py-1.5">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onAdd}
            className="h-6 w-6 p-0"
            aria-label="Add bar"
          >
            <Icons.Plus className="h-3 w-3" />
          </Button>
        </div>
      )}
    </div>
  );
}
