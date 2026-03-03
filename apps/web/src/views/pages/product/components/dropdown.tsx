import { useState } from 'react';
import {
  IoChevronDownCircleOutline,
  IoChevronUpCircleOutline,
} from 'react-icons/io5';

interface IDropdown {
  body?: string;
  header: string;
}

export default function Dropdown({ body, header }: IDropdown) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const bodyLines = body?.split('\n');
  const isDash = (line: string) => line.trim().startsWith('-');

  return (
    <div className="relative border-t border-gray-300">
      {isOpen ? (
        <div
          className="flex justify-between my-4"
          onClick={() => setIsOpen(false)}
        >
          <h1 className="font-semibold">{header}</h1>
          <button
            aria-label="Close"
            onClick={() => setIsOpen(false)}
            className="text-xl"
          >
            <IoChevronUpCircleOutline />
          </button>
        </div>
      ) : (
        <div
          className="flex justify-between my-4"
          onClick={() => setIsOpen(true)}
        >
          <h1 className="font-light">{header}</h1>
          <button
            aria-label="See more"
            onClick={() => setIsOpen(true)}
            className="text-xl"
          >
            <IoChevronDownCircleOutline />
          </button>
        </div>
      )}

      {isOpen && (
        <div className="mb-5 w-full z-10 text-sm font-light transition-transform transition-discrete delay-700 duration-1000 ease-in-out">
          {bodyLines?.map((line, idx) => {
            const trimmed = line.trim();

            if (!trimmed) {
              return <div key={idx} className="my-2" />;
            }

            if (isDash(line)) {
              return (
                <p key={idx} className="mb-1">
                  {trimmed}
                </p>
              );
            }

            return (
              <p key={idx} className="mb-2">
                {trimmed}
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
}
