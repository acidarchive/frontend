import { Note, TB303StepNote } from '@/api/generated/model';

interface ReadonlyNoteDisplayProps {
  note?: TB303StepNote;
}

export function NoteDisplay({ note }: ReadonlyNoteDisplayProps) {
  return <span className="text-md">{note === Note.Chigh ? "C'" : note}</span>;
}
