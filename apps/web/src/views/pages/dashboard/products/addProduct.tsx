'use client';

import Button from '@/views/components/button';
import AddProductForm from './components/addProductForm';
import { IoDocumentText, IoDuplicate } from 'react-icons/io5';
import { MdNewLabel } from 'react-icons/md';
import { FormikProps } from 'formik';
import { IProductFormValues } from './types';
import { useRef } from 'react';

export default function AddProductDahsboardView() {
  const formikRef = useRef<FormikProps<IProductFormValues>>(null);

  const addProductHandler = () => {
    formikRef.current?.submitForm();
  };

  return (
    <div className="relative px-3 mt-5">
      <div className="flex space-x-2 items-center mb-5 sm:-mb-10">
        <MdNewLabel className="text-2xl" />
        <h1 className="font-semibold">Add New Product Form</h1>
      </div>
      <div className="sticky top-1 z-10 mx-1 flex items-center justify-between">
        <div className="ml-auto bg-primary-opacity backdrop-blur-xl p-1 rounded-lg">
          <div className="flex gap-1 text-xs sm:text-sm">
            <Button className="flex-none border border-orange-800 dark:text-orange-700 dark:border-orange-700 text-orange-800 hover:border-orange-700 hover:text-white w-fit! rounded-lg! shadow">
              <div className="flex items-center space-x-3">
                <IoDocumentText className="text-xl" />
                <p>Save Draft</p>
              </div>
            </Button>
            <Button
              type="submit"
              className="bg-orange-800 flex-none w-fit! rounded-lg! shadow"
              onClick={addProductHandler}
            >
              <div className="flex items-center space-x-3">
                <IoDuplicate className="text-xl" />
                <p>Submit</p>
              </div>
            </Button>
          </div>
        </div>
      </div>
      <div>
        <AddProductForm formikRef={formikRef} />
      </div>
    </div>
  );
}
