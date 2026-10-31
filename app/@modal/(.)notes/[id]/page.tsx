import NotePreviewClient from './NotePreview.client';
import { fetchNoteById } from '@/lib/api';
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';

interface NoteDetailsProps {
  params: Promise<{ id: string }>;
}

const NotePreviewContent = async ({ params }: NoteDetailsProps) => {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreviewClient />
    </HydrationBoundary>
  );
};

export default NotePreviewContent;
