import ErrorForm from '@/views/components/formik/errorForm';
import useHandleClickOutside from '@/views/pages/template/hooks/useHandleClickOutside';
import { useField } from 'formik';
import { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';

interface Option {
  id: number;
  name: string;
  slug?: string;
  hexUrl?: string;
}

interface CustomSelectProps {
  name: string;
  label: string;
  options: Option[];
  placeholder?: string;
  isMutipleSelect?: boolean;
  isAttribute?: boolean;
  value?: number[];
  onSelect?: (value: number[]) => void;
  onDelete?: () => void;
}

export default function SelectForm({
  options,
  name,
  label,
  placeholder = `Select ${label.toLowerCase()} here`,
  isMutipleSelect = false,
  isAttribute = false,
  value = [],
  onSelect,
  onDelete,
}: CustomSelectProps) {
  const [field, meta, helpers] = useField<number | number[] | null>(name);
  const [open, setOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');

  const selectedIds: number[] =
    value && value.length > 0
      ? value
      : field.value == null
        ? []
        : Array.isArray(field.value)
          ? field.value
          : [field.value];

  useEffect(() => {
    if (value && value.length > 0 && !field.value) {
      helpers.setValue(value);
    }
  }, [value]);

  const selectedOptions = options.filter((o) => selectedIds.includes(o.id));

  const handleClose = () => {
    setOpen(false);
    helpers.setTouched(true);
  };

  const { dropdownRef, modalRef } = useHandleClickOutside({
    handleClickOutside: handleClose,
  });

  const handleSelect = (id: number) => {
    if (isMutipleSelect) {
      let newValue: number[];

      if (selectedIds.includes(id)) {
        newValue = selectedIds.filter((v) => v !== id);
      } else {
        newValue = [...selectedIds, id];
      }

      helpers.setValue(newValue);
      onSelect?.(newValue);
    } else {
      const isSame = field.value === id;

      const newValue = isSame ? null : id;

      helpers.setValue(newValue);
      setOpen(false);
    }

    helpers.setTouched(true);
  };

  const filteredOptions = options.filter((opt) =>
    opt.name.toLowerCase().includes(search.toLowerCase()),
  );

  const labelName =
    selectedOptions.length > 0
      ? isAttribute
        ? selectedOptions.map((o) => o.name).join(', ')
        : isMutipleSelect
          ? 'Add more'
          : selectedOptions[0].name
      : placeholder;

  return (
    <div className="relative w-full mt-2">
      <label htmlFor={name} className="ml-4">
        {label}
      </label>

      <div className="flex flex-wrap items-center gap-1 lg:gap-x-3 w-full">
        {isMutipleSelect &&
          !isAttribute &&
          selectedOptions.map((opt) => (
            <span
              key={opt.id}
              className="bg-orange-800 text-white px-4 h-10 rounded-full text-sm flex items-center gap-2 grow justify-between"
            >
              {opt.name}
              <IoClose
                className="text-lg cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelect(opt.id);
                }}
              />
            </span>
          ))}

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className={`rounded-full text-sm px-4 h-10 text-left ${isMutipleSelect && !isAttribute && selectedOptions.length > 0 ? 'w-fit bg-black text-light' : 'grow bg-black/10 dark:bg-white/10 '}`}
        >
          <p
            className={
              selectedOptions.length === 0
                ? 'text-xs opacity-50'
                : 'flex items-center justify-between'
            }
          >
            {labelName}

            {isAttribute && field.value && (
              <span
                className="ml-2 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  helpers.setValue(null);
                  onDelete?.();
                }}
              >
                <IoClose className="text-red-600 text-lg" />
              </span>
            )}
          </p>
        </button>
      </div>

      {open && (
        <div
          ref={modalRef}
          className="absolute z-20 mt-1 w-2xs max-w-full bg-secondary-opacity backdrop-blur-xl rounded-2xl shadow py-3 max-h-[30vh] overflow-x-scroll scrollbar-hide text-sm"
        >
          <div className="px-2 pb-2">
            <input
              type="text"
              placeholder={`Search ${label.toLowerCase()}`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-3 py-2 rounded-full bg-black/10 dark:bg-white/10 outline-none text-sm"
            />
          </div>

          <div
            className="max-h-[20vh] overflow-y-auto scrollbar-hide"
            ref={dropdownRef}
          >
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => {
                const isSelected = selectedIds.includes(opt.id);
                return (
                  <div
                    key={opt.id}
                    onClick={() => handleSelect(opt.id)}
                    className={`px-3 py-2 cursor-pointer ${
                      isSelected
                        ? 'bg-orange-800 text-white'
                        : 'hover:bg-orange-800 hover:text-white'
                    }`}
                  >
                    {opt.name}
                  </div>
                );
              })
            ) : (
              <p className="px-3 py-2 text-sm opacity-50">No results found</p>
            )}
          </div>
        </div>
      )}
      <ErrorForm name={name} />
    </div>
  );
}
