import { GridTextarea } from '@/components/atoms/grid-textarea';

interface TB303NotesProps {
  readonly?: boolean;
}

export function TB303Notes({ readonly = false }: TB303NotesProps) {
  return (
    <div>
      <div className="text-sm font-medium px-4 py-2">efx/notes</div>
      <GridTextarea name="description" disabled={readonly} />
    </div>
  );
}
