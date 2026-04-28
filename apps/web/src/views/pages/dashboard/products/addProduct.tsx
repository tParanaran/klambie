'use client';

import Button from '@/views/components/button';
import AddProductForm from './components/addProductForm';
import {
  IoBackspace,
  IoDocumentText,
  IoDuplicate,
  IoSave,
} from 'react-icons/io5';
import { MdEditNote, MdNewLabel, MdNote } from 'react-icons/md';
import { FormikProps } from 'formik';
import { IProductFormValues } from './types';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

export interface IProps {
  type: 'ACTIVE' | 'DRAFT';
  mode: 'CREATE' | 'EDIT';
  product?: IProductFormValues;
}

export default function AddProductDahsboardView({
  type,
  mode,
  product,
}: IProps) {
  const router = useRouter();
  const formikRef = useRef<FormikProps<IProductFormValues>>(null);
  const [submitType, setSubmitType] = useState<'ACTIVE' | 'DRAFT'>(type);
  const isEdit = mode === 'EDIT' && type === 'ACTIVE';

  const addProductHandler = () => {
    setSubmitType('ACTIVE');
    formikRef.current?.submitForm();
  };

  const saveDraftOrCancelHandler = () => {
    if (isEdit) {
      router.back();
    } else {
      setSubmitType('DRAFT');
      formikRef.current?.submitForm();
    }
  };

  return (
    <div className="relative mt-2">
      <div className="sticky top-0 z-10 flex items-center justify-between flex-wrap w-full bg-dashboard">
        <div className="flex space-x-2 items-center my-2 px-3">
          <div className="text-2xl">
            {mode === 'CREATE' ? (
              <MdNewLabel />
            ) : type === 'DRAFT' ? (
              <MdNote />
            ) : (
              <MdEditNote />
            )}
          </div>

          <h1 className="font-semibold">
            {mode === 'CREATE'
              ? 'Add New Product'
              : type === 'DRAFT'
                ? 'Resuming Draft'
                : 'Editing Product'}
          </h1>
        </div>
        <div className="ml-auto bg-primary-opacity backdrop-blur-xl p-1 rounded-lg px-3">
          <div className="flex gap-1 text-xs sm:text-sm">
            <Button
              className="flex-none border border-orange-800 dark:text-orange-700 dark:border-orange-700 text-orange-800 hover:border-orange-700 hover:text-white w-fit! rounded-lg! shadow"
              onClick={saveDraftOrCancelHandler}
            >
              <div className="flex items-center space-x-3">
                <div className="text-xl">
                  {isEdit ? <IoBackspace /> : <IoDocumentText />}
                </div>
                <p>{isEdit ? 'Cancel' : 'Save Draft'}</p>
              </div>
            </Button>

            <Button
              type="submit"
              className="bg-orange-800 flex-none w-fit! rounded-lg! shadow"
              onClick={addProductHandler}
            >
              <div className="flex items-center space-x-3">
                <div className="text-xl">
                  {isEdit ? <IoSave /> : <IoDuplicate />}
                </div>
                <p>{isEdit ? 'Save' : 'Submit'}</p>
              </div>
            </Button>
          </div>
        </div>
      </div>
      <div className="px-3">
        <AddProductForm
          formikRef={formikRef}
          submitType={submitType}
          mode={mode}
          product={product}
        />
      </div>
    </div>
  );
}
