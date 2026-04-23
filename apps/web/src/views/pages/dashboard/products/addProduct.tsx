'use client';

import Button from '@/views/components/button';
import AddProductForm from './components/addProductForm';
import { IoDocumentText, IoDuplicate } from 'react-icons/io5';
import { MdNewLabel } from 'react-icons/md';
import { FormikProps } from 'formik';
import { IProductFormValues } from './types';
import { useRef, useState } from 'react';

export default function AddProductDahsboardView() {
  const formikRef = useRef<FormikProps<IProductFormValues>>(null);
  const [submitType, setSubmitType] = useState<'ACTIVE' | 'DRAFT'>('ACTIVE');

  const addProductHandler = () => {
    setSubmitType('ACTIVE');
    formikRef.current?.submitForm();
  };

  const saveDraftHandler = () => {
    setSubmitType('DRAFT');
    formikRef.current?.submitForm();
  };

  return (
    <div className="relative mt-2">
      <div className="sticky top-0 z-10 flex items-center justify-between flex-wrap bg-body w-full">
        <div className="flex space-x-2 items-center my-2 px-3">
          <MdNewLabel className="text-2xl" />
          <h1 className="font-semibold">Add New Product</h1>
        </div>
        <div className="ml-auto bg-primary-opacity backdrop-blur-xl p-1 rounded-lg px-3">
          <div className="flex gap-1 text-xs sm:text-sm">
            <Button
              className="flex-none border border-orange-800 dark:text-orange-700 dark:border-orange-700 text-orange-800 hover:border-orange-700 hover:text-white w-fit! rounded-lg! shadow"
              onClick={saveDraftHandler}
            >
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
      <div className="px-3">
        <AddProductForm formikRef={formikRef} submitType={submitType} />
      </div>
    </div>
  );
}
