import { useEffect, useState } from 'react';
import { IoInformation, IoWarning } from 'react-icons/io5';

export default function ErrorsMessage({
  errors,
  success,
}: {
  errors?: string[];
  success?: string;
}) {
  const [message, setMessage] = useState<string>();

  useEffect(() => {
    if (success) {
      setMessage(success);
      const timer = setTimeout(() => setMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);
  return (
    <div>
      {errors && (
        <>
          {errors?.map((err, e) => (
            <div
              key={e}
              className="text-white text-xs mt-1 flex bg-red-800 rounded-full px-2 py-0.5 w-fit animate-pulse"
            >
              <IoWarning className="mr-1 text-lg" /> {err}
            </div>
          ))}
        </>
      )}
      {message && (
        <p className="bg-emerald-600 text-white text-xs mt-1 flex rounded-full px-2 py-0.5 w-fit animate-pulse">
          {' '}
          <IoInformation className="mr-1 text-lg" /> {message}
        </p>
      )}
    </div>
  );
}
