import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import type { Note } from '@/types/note';
import { showError } from '@/utils/error';

export const useMutationNotes = <T>(
  fetchFn: (params: T) => Promise<Note>,
  successMessage: string,
  onSuccessCallback?: () => void
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: fetchFn,

    onSuccess: ({ title }) => {
      toast.success(`${title} ${successMessage}`);

      queryClient.invalidateQueries({
        queryKey: ['notes'],
      });
      onSuccessCallback?.();
    },

    onError: (error: Error) => {
      showError(error);
    },
  });
};
