import { Note, CreateNote, NoteTag } from '@/types/note';
import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const BASE_URL = process.env.NEXT_PUBLIC_NOTEHUB_BASE_URL;

interface NoteSearchResponse {
  notes: Note[];
  totalPages: number;
}

const $host = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});

export async function fetchNotes(
  search?: string,
  page: number = 1,
  tag?: NoteTag
): Promise<NoteSearchResponse> {
  const { data } = await $host.get<NoteSearchResponse>('/notes', {
    params: {
      ...(search && { search }),
      ...(tag && { tag }),
      page,
      perPage: 10,
      sortBy: 'created',
    },
  });
  return data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const { data } = await $host.get<Note>('/notes/' + id);
  return data;
}

export async function createNote(note: CreateNote): Promise<Note> {
  const { data } = await $host.post<Note>('/notes', note);
  return data;
}

export async function deleteNote(id: string): Promise<Note> {
  const { data } = await $host.delete<Note>('/notes/' + id);
  return data;
}
