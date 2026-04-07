'use client';
import { useDebouncedCallback } from 'use-debounce';
import { IoClose, IoSearch } from 'react-icons/io5';
import { useEffect, useRef, useState } from 'react';
import { Field, Form, Formik, FormikProps } from 'formik';
import searchSchema from '../schema';
import { useQueryParams } from '../../c/hooks/useQueryParams';

interface ISearchForm {
  showSearch?: boolean;
}

export default function ({ showSearch }: ISearchForm) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { getParams, createNewRouteParams, clearAllParams } = useQueryParams();
  const params = getParams('q') || '';

  useEffect(() => {
    if (showSearch) {
      inputRef.current?.focus();
    }
  }, []);

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

  const HandleSearch = useDebouncedCallback((term: string) => {
    createNewRouteParams('q', term, '/s');
    storeRecentSearch(term);
  }, 1000);

  return (
    <div className="text-orange-700">
      <div className="w-full">
        <Formik
          initialValues={{
            search: params,
          }}
          enableReinitialize={true}
          validationSchema={searchSchema}
          onSubmit={(values) => {
            HandleSearch(values.search);
          }}
        >
          {(props: FormikProps<{ search: string }>) => {
            const { values, errors, touched, handleChange, handleSubmit } =
              props;
            return (
              <Form onSubmit={handleSubmit}>
                <div className="relative flex items-center bg-black/10 dark:bg-white/10 rounded-full">
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
                    value={values.search}
                  />
                  {params !== '' ? (
                    <button
                      type="button"
                      className="absolute right-2 top-2 text-orange-700 text-2xl hover:scale-125"
                      aria-label="Clear search"
                      onClick={() => clearAllParams}
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
