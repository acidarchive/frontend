import { Note, TB303StepNote } from '@/api/generated/model';

interface ReadonlyNoteDisplayProps {
  note?: TB303StepNote;
}

export function NoteDisplay({ note }: ReadonlyNoteDisplayProps) {
  return (
    <span className="text-gray-900 text-sm">
      {note === Note.Chigh ? "C'" : note}
    </span>
  );
}
