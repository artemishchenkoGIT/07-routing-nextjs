import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';

import NoteDetailsClient from './NoteDetails.client';
import { fetchNoteById } from '@/lib/api';

interface NoteDetailsProps {
  params: Promise<{ id: string }>;
}

const NoteDetailsContent = async ({ params }: NoteDetailsProps) => {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
};

export default NoteDetailsContent;
