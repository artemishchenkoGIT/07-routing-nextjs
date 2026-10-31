'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import css from './NoteDetails.module.css';
import { fetchNoteById } from '@/lib/api';
import Loader from '@/components/UI/Loader/Loader';
import ErrorMessage from '@/components/UI/ErrorMessage/ErrorMessage';

const NoteDetailsClient = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <Loader />;

  if (error) return <ErrorMessage error={error} />;

  const formattedDate = note?.updatedAt
    ? `Updated at: ${note.updatedAt}`
    : `Created at: ${note?.createdAt}`;

  return (
    <main className={css.main}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note?.title}</h2>
          </div>
          <p className={css.tag}>{note?.tag}</p>
          <p className={css.content}>{note?.content}</p>
          <p className={css.date}>{formattedDate}</p>
        </div>
      </div>
    </main>
  );
};

export default NoteDetailsClient;
