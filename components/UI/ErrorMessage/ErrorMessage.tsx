import { showError } from '@/utils/error';
import { useEffect } from 'react';

interface ErrorMessageProps {
  error: Error;
}

function ErrorMessage({ error }: ErrorMessageProps) {
  useEffect(() => {
    showError(error);
  }, [error]);

  return null;
}

export default ErrorMessage;
