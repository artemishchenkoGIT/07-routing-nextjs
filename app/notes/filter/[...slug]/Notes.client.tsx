'use client';

import css from './NotesPage.module.css';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useFetchNotes } from '@/hooks/useFetchNotes';
import { useDebouncedCallback } from 'use-debounce';
import NoteForm from '@/components/NoteForm/NoteForm';
import Modal from '@/components/Modal/Modal';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import Loader from '@/components/UI/Loader/Loader';

import NoteList from '@/components/NoteList/NoteList';
import ErrorMessage from '@/components/UI/ErrorMessage/ErrorMessage';
import { NoteTag } from '@/types/note';

type NotesClientProps = {
  tag: NoteTag | undefined;
};

function NotesClient({ tag }: NotesClientProps) {
  const [query, setQuery] = useState<string>('');

  const [page, setPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { data, isLoading, isFetching, isError, error, isSuccess } =
    useFetchNotes(query, page, tag);

  useEffect(() => {
    if (isSuccess && data?.notes.length === 0) {
      toast.error('No notes found for your request.');
    }
  }, [isSuccess, data]);

  const totalPages = data?.totalPages ?? 0;

  const updateQuery = useDebouncedCallback((value: string) => {
    setQuery(value);
    setPage(1);
  }, 300);

  return (
    <div className={css.app}>
      {(isLoading || isFetching) && <Loader />}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
      <header className={css.toolbar}>
        <SearchBox onQueryChange={updateQuery} />
        {isSuccess && totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        )}
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>
      {data?.notes && data.notes.length > 0 && <NoteList notes={data.notes} />}
      {isError && <ErrorMessage error={error} />}
    </div>
  );
}

export default NotesClient;
