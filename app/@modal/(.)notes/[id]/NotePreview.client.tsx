'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { fetchNoteById } from '@/lib/api';
import Loader from '@/components/UI/Loader/Loader';
import ErrorMessage from '@/components/UI/ErrorMessage/ErrorMessage';
import css from './NotePreview.module.css';
import Modal from '@/components/Modal/Modal';

const NotePreviewClient = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  const formattedDate = note?.updatedAt
    ? `Updated at: ${note.updatedAt}`
    : `Created at: ${note?.createdAt}`;

  const close = () => router.back();

  if (isLoading) return <Loader />;

  if (error) return <ErrorMessage error={error} />;

  return (
    <Modal onClose={close}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note?.title}</h2>
          </div>
          <p className={css.tag}>{note?.tag}</p>
          <p className={css.content}>{note?.content}</p>
          <p className={css.date}>{formattedDate}</p>
          <button onClick={close} className={css.backBtn}>
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default NotePreviewClient;
