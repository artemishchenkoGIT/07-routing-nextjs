import type { NoteTag } from '@/types/note';

export const isNoteTag = (value: string): value is NoteTag => {
  return ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'].includes(value);
};
