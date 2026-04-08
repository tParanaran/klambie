import { forwardRef, useImperativeHandle, useState } from 'react';
import { IoInformation, IoWarning } from 'react-icons/io5';

export interface IErrorsMessageHandle {
  showMessage: (message: { success?: string; errors?: string[] }) => void;
}

const ErrorsMessage = forwardRef<IErrorsMessageHandle>((props, ref) => {
  const [visibleErrors, setVisibleErrors] = useState<string[]>([]);
  const [visibleSuccess, setVisibleSuccess] = useState<string>('');

  useImperativeHandle(ref, () => ({
    showMessage: ({
      success,
      errors,
    }: {
      success?: string;
      errors?: string[];
    }) => {
      if (success) {
        setVisibleSuccess(success);
        setTimeout(() => setVisibleSuccess(''), 3000);
      }

      if (errors && errors.length > 0) {
        setVisibleErrors((prev) => Array.from(new Set([...prev, ...errors])));
        setTimeout(
          () =>
            setVisibleErrors((prev) => prev.filter((e) => !errors.includes(e))),
          3000,
        );
      }
    },
  }));
  return (
    <div className="flex space-x-1 flex-wrap">
      {visibleErrors.map((err, e) => (
        <div
          key={e}
          className="text-light text-xs mt-1 flex bg-red-800 rounded-full px-2 py-0.5 w-fit animate-pulse"
        >
          <IoWarning className="mr-1 text-lg" /> {err}
        </div>
      ))}

      {visibleSuccess && (
        <p className="bg-emerald-600 text-light text-xs mt-1 flex rounded-full px-2 py-0.5 w-fit animate-pulse">
          {' '}
          <IoInformation className="mr-1 text-lg" /> {visibleSuccess}
        </p>
      )}
    </div>
  );
});

export default ErrorsMessage;
