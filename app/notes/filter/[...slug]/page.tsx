import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import NotesClient from './Notes.client';
import { fetchNotes } from '@/lib/api';
import { isNoteTag } from '@/types/guards';
import { notFound } from 'next/navigation';

type NotesPageProps = {
  params: Promise<{ slug: string[] }>;
};

const NotesPage = async ({ params }: NotesPageProps) => {
  const queryClient = new QueryClient();

  const { slug } = await params;

  if (slug.length !== 1) {
    notFound();
  }

  const category =
    slug[0] === 'all' || !isNoteTag(slug[0]) ? undefined : slug[0];

  if (category !== undefined && !isNoteTag(category)) {
    notFound();
  }

  await queryClient.prefetchQuery({
    queryKey: ['notes', '', 1, category],
    queryFn: () => fetchNotes('', 1, category),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={category} />
    </HydrationBoundary>
  );
};

export default NotesPage;
