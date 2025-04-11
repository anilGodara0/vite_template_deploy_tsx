import { useSnackbar } from 'notistack';

/**
 * useToast - A hook that returns a reusable toast function
 * Auto detects success or error toast.
 */
export const useToast = () => {
  const { enqueueSnackbar } = useSnackbar();

  const showToast = (res: { message?: string; success?: boolean; fullFillHide?: boolean }) => {
    const { message, success, fullFillHide } = res;
    const variant = success ? 'success' : 'error';

    if (fullFillHide && variant === 'success') return;

    enqueueSnackbar(message || 'Ok', {
      variant,
      autoHideDuration: 3000,
    });
  };

  return showToast;
};
