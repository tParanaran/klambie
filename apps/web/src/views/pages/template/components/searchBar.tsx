'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
// import { useDebouncedCallback } from 'use-debounce';
import { IoClose, IoSearch } from 'react-icons/io5';
import { useEffect, useRef, useState } from 'react';
import { Field, Form, Formik, FormikProps } from 'formik';
import searchSchema from '../schema';

interface ISearchForm {
  showSearch?: boolean;
}

export default function SearchForm({ showSearch }: ISearchForm) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const inputRef = useRef<HTMLInputElement>(null);
  const { replace } = useRouter();
  const [queryTerm, setQueryTerm] = useState<string>('');

  useEffect(() => {
    if (showSearch) {
      inputRef.current?.focus();
    }

    const getParams = searchParams.get('search')?.toString();
    if (getParams === undefined) {
      setQueryTerm('');
    } else {
      setQueryTerm(getParams);
    }
  }, [searchParams]);

  const HandleSearch = (term: string) => {
    const params = new URLSearchParams();
  };

  const storeRecentSearch = (term: string) => {
    let recentSearches = JSON.parse(
      localStorage.getItem('recentSearches') || '[]',
    );
    recentSearches = [
      term,
      ...recentSearches.filter((item: string) => item !== term),
    ].slice(0, 10);
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
  };

  return (
    <div className="text-orange-700">
      <div className="w-full">
        <Formik
          initialValues={{
            search: queryTerm,
          }}
          enableReinitialize={true}
          validationSchema={searchSchema}
          onSubmit={(values) => {
            HandleSearch(values.search);
            storeRecentSearch(values.search);
          }}
        >
          {(props: FormikProps<{ search: string }>) => {
            const { values, errors, touched, handleChange, handleSubmit } =
              props;
            return (
              <Form onSubmit={handleSubmit}>
                <div className="relative flex items-center bg-black/10 rounded-full">
                  <label htmlFor="search">
                    {' '}
                    <IoSearch className="text-2xl w-fit ml-2" />
                  </label>

                  <Field
                    ref={inputRef}
                    type="text"
                    name="search"
                    className={`appearance-none border-none w-full rounded-full py-2.5 px-2 leading-tight focus:outline-none placeholder:text-sm ${
                      touched.search && errors.search
                        ? 'placeholder-red-500 text-red-500'
                        : 'text-zinc-500'
                    }`}
                    placeholder={
                      touched.search && errors.search
                        ? errors.search
                        : 'Search product here'
                    }
                    onChange={handleChange}
                    values={values.search}
                  />
                  {queryTerm !== '' ? (
                    <button
                      type="button"
                      className="absolute right-2 top-2 text-orange-700 text-2xl hover:scale-125"
                      aria-label="Clear search"
                      onClick={() => HandleSearch('')}
                    >
                      <IoClose />
                    </button>
                  ) : null}
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}
