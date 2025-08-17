import { TB303PatternDescription } from '@/api/generated/model';

interface ReadonlyTB303Notes {
  description?: TB303PatternDescription;
}

export function ReadonlyTB303Notes({ description }: ReadonlyTB303Notes) {
  return (
    <div>
      <div className="text-sm font-medium px-4 py-2">efx/notes</div>
      {description}
    </div>
  );
}
