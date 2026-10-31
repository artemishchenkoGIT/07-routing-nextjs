import axios from 'axios';
import toast from 'react-hot-toast';
import { ApiError } from '@/types/apiError';

export const showError = (error: Error) => {
  if (axios.isAxiosError<ApiError>(error)) {
    toast.error(error.response?.data?.message ?? 'Unknown error');
  } else {
    toast.error(error.message || 'Unknown error');
  }
};
