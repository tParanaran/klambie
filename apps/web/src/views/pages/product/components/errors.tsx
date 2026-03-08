import { useEffect, useState } from 'react';
import { IoInformation, IoWarning } from 'react-icons/io5';

export default function ErrorsMessage({
  errors,
  success,
}: {
  errors: string[];
  success: string;
}) {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (success) {
      setMessage(success);
      const timer = setTimeout(() => setMessage(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [success]);
  return (
    <div>
      {errors.length > 0 && (
        <>
          {errors.map((err, e) => (
            <div key={e} className="text-orange-700 text-sm ml-4 mt-1 flex">
              <IoWarning className="mr-1 text-lg" /> {err}
            </div>
          ))}
        </>
      )}
      {message && (
        <p className="text-green-700 text-sm ml-4 mt-1 flex">
          {' '}
          <IoInformation className="mr-1 text-lg" /> {message}
        </p>
      )}
    </div>
  );
}
