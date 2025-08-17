import { GridTextarea } from '@/components/atoms/grid-textarea';

export function EditableTB303Notes() {
  return (
    <div>
      <div className="text-sm font-medium px-4 py-2">efx/notes</div>
      <GridTextarea name="description" />
    </div>
  );
}
