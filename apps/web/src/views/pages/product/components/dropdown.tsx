import { useEffect, useRef, useState } from 'react';
import { IoChevronDownCircleOutline } from 'react-icons/io5';

interface IDropdown {
  body?: string;
  header: string;
}

export default function Dropdown({ body, header }: IDropdown) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [height, setHeight] = useState('0px');
  const contentRef = useRef<HTMLDivElement>(null);

  const bodyLines = body
    ?.replace(/\s-\s/g, '\n- ')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? `${contentRef.current.scrollHeight}px` : '0px');
    }
  }, [isOpen, bodyLines?.length]);

  return (
    <div className="relative border-t border-gray-300">
      <div
        className="flex justify-between my-4 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h1 className={`${isOpen ? 'font-semibold' : 'font-light'}`}>
          {' '}
          {header}
        </h1>
        <button
          aria-label={isOpen ? 'Close' : 'See more'}
          onClick={() => setIsOpen(!isOpen)}
          className="text-xl transform transition-transform duration-300 ease-in-out"
        >
          <span
            className={`inline-block transform transition-transform duration-300 ease-in-out ${
              isOpen ? 'rotate-180' : 'rotate-0'
            }`}
          >
            <IoChevronDownCircleOutline />
          </span>
        </button>
      </div>
      <div
        ref={contentRef}
        style={{ height }}
        className="text-sm font-light overflow-hidden transition-[height] duration-500 ease-in-out mb-1"
      >
        {bodyLines?.map((line, idx) => {
          const trimmed = line.trim();

          if (!trimmed) {
            return <div key={idx} className="my-2" />;
          }

          if (trimmed.startsWith('-')) {
            return (
              <ul
                key={idx}
                className="mb-2 transition-opacity duration-300 ease-in-out opacity-100"
              >
                <li>{trimmed.replace(/^-+\s*/, '-  ')}</li>
              </ul>
            );
          }

          return (
            <p
              key={idx}
              className="mb-2  transition-opacity duration-300 ease-in-out opacity-100"
            >
              {trimmed}
            </p>
          );
        })}
      </div>
    </div>
  );
}
