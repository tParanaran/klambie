import { useState } from 'react';
import { ICategories } from '@/views/pages/c/types';
import useAttribute from '@/views/pages/c/hooks/useAttribute';
import { useField } from 'formik';
import ErrorForm from '@/views/components/formik/errorForm';
import useHandleClickOutside from '@/views/pages/template/hooks/useHandleClickOutside';
import { IoChevronForward, IoClose } from 'react-icons/io5';

export default function SelectCategories() {
  const { categories } = useAttribute();
  const [field, meta, helpers] = useField<string[]>('productCategories');
  const [paths, setPaths] = useState<number[][]>([[]]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [search, setSearch] = useState<string>('');

  const { modalRef, dropdownRef } = useHandleClickOutside({
    handleClickOutside: () => setOpenIndex(null),
  });

  const getCategoriesByPath = (
    categories: ICategories[],
    path: number[],
  ): ICategories[] => {
    let current = categories;

    for (const id of path) {
      const found = current.find((c) => c.hierarchyId === id);
      if (!found) return [];
      current = found.subcategories || [];
    }

    return current;
  };

  const getLabels = (categories: ICategories[], path: number[]) => {
    let current = categories;
    const labels: string[] = [];

    for (const id of path) {
      const found = current.find((c) => c.hierarchyId === id);
      if (!found) break;

      labels.push(found.name);
      current = found.subcategories || [];
    }

    return labels;
  };

  const handleSelect = (index: number, hierarchyId: number) => {
    const path = paths[index];
    const newPath = [...path, hierarchyId];

    const next = getCategoriesByPath(categories, newPath);

    const newPaths = [...paths];
    newPaths[index] = newPath;

    setSearch('');
    setOpenIndex(null);

    helpers.setValue(
      newPaths.filter((p) => p.length > 0).map((p) => p.join('.')),
    );

    if (!next.length) {
      const isLastEmpty = newPaths[newPaths.length - 1].length === 0;

      if (!isLastEmpty) {
        newPaths.push([]);
      }

      setPaths(newPaths);
      return;
    }

    setPaths(newPaths);

    setTimeout(() => {
      setOpenIndex(index);
    }, 0);
  };

  const removeCategory = (index: number) => {
    const newPaths = paths.filter((_, i) => i !== index);

    setPaths(newPaths.length ? newPaths : [[]]);
    setSearch('');

    helpers.setValue(
      newPaths.filter((p) => p.length > 0).map((p) => p.join('.')),
    );
  };

  return (
    <div className="text-sm mt-2">
      <label htmlFor="productCategories" className="ml-4">
        Category
      </label>

      <div className="relative">
        {paths.map((path, index) => {
          const labels = getLabels(categories, path);
          const currentCategories = getCategoriesByPath(categories, path);

          const filteredOptions = currentCategories.filter((opt) =>
            opt.name.toLowerCase().includes(search.toLowerCase()),
          );

          return (
            <div key={index} className="relative">
              <button
                type="button"
                onClick={() => {
                  if (!currentCategories.length) return;
                  setOpenIndex(openIndex === index ? null : index);
                }}
                className={`bg-black/10 dark:bg-white/10 rounded-full px-4 h-10 flex items-center w-full
                ${!currentCategories.length ? 'cursor-not-allowed mb-2' : ''}
              `}
              >
                <div className="flex gap-1 flex-1 min-w-0 overflow-y-scroll scrollbar-hide">
                  {labels.length === 0 ? (
                    <span className="text-xs opacity-50">
                      {paths.filter((p) => p.length > 0).length === 0
                        ? 'Select category here'
                        : 'Add more category here'}
                    </span>
                  ) : (
                    labels.map((label, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-1 whitespace-nowrap"
                      >
                        <p>{label}</p>
                        {i < labels.length - 1 && (
                          <IoChevronForward className="text-base opacity-60 shrink-0" />
                        )}
                      </div>
                    ))
                  )}
                </div>

                {path.length > 0 && (
                  <IoClose
                    onClick={(e) => {
                      e.stopPropagation();
                      removeCategory(index);
                    }}
                    className="text-red-600 text-lg"
                  />
                )}
              </button>

              {openIndex === index && currentCategories.length > 0 && (
                <div
                  ref={dropdownRef}
                  className="absolute z-20 mt-1 w-2xs bg-secondary-opacity backdrop-blur-xl rounded-2xl shadow py-3 max-h-[30vh] overflow-y-scroll scrollbar-hide"
                >
                  <div className="px-2 pb-2">
                    <input
                      type="text"
                      placeholder="Search category"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full px-3 py-2 rounded-full bg-black/10 dark:bg-white/10 outline-none text-sm"
                    />
                  </div>

                  <div
                    ref={modalRef}
                    className="max-h-[20vh] overflow-y-auto scrollbar-hide"
                  >
                    {filteredOptions.length > 0 ? (
                      filteredOptions.map((cat) => (
                        <div
                          key={cat.id}
                          onClick={() => handleSelect(index, cat.hierarchyId)}
                          className="px-3 py-2 cursor-pointer hover:bg-orange-800 hover:text-white"
                        >
                          {cat.name}
                        </div>
                      ))
                    ) : (
                      <p className="px-3 py-2 text-sm opacity-50">
                        No results found
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
        <ErrorForm name={'productCategories'} />
      </div>
    </div>
  );
}
