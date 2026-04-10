import ErrorForm from '@/views/components/formik/errorForm';
import useHandleClickOutside from '@/views/pages/template/hooks/useHandleClickOutside';
import { useState } from 'react';

interface Option {
  id: number;
  name: string;
}

interface CustomSelectProps {
  name: string;
  options: Option[];
  value: number | null;
  onChange: (value: number) => void;
  onBlur?: () => void;
  placeholder?: string;
}

export default function SelectBrandForm({
  options,
  name,
  value,
  onChange,
  onBlur,
  placeholder = 'Select...',
}: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const { modalRef } = useHandleClickOutside({
    handleClickOutside: () => setOpen(false),
  });

  const selected = options.find((o) => o.id === value);

  return (
    <div className="relative w-full mt-2" ref={modalRef}>
      <label htmlFor={name} className="ml-4">
        Brand
      </label>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="bg-black/10 dark:bg-white/10 rounded-full py-3 px-4 leading-tight text-left focus:outline-none focus:bg-background focus:border focus:border-gray-300 w-full"
      >
        {selected ? (
          selected.name
        ) : (
          <p className="text-xs opacity-50">{placeholder}</p>
        )}
      </button>

      {open && (
        <div className="absolute z-20 mt-1 w-2xs bg-secondary-opacity backdrop-blur-xl rounded-2xl shadow py-3 max-h-[30vh] overflow-x-scroll scrollbar-hide">
          {options.map((opt) => (
            <div
              key={opt.id}
              onClick={() => {
                onChange(opt.id);
                onBlur?.();
                setOpen(false);
              }}
              className="px-3 py-2 hover:bg-orange-800 text-hover-light cursor-pointer"
            >
              {opt.name}
            </div>
          ))}
        </div>
      )}
      <ErrorForm name={name} />
    </div>
  );
}
