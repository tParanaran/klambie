'use client';

import Button from '@/views/components/button';
import { IoDocumentText, IoDuplicate } from 'react-icons/io5';
import { MdNewLabel } from 'react-icons/md';
import AddProductForm from './components/addProductForm';

export default function AddProductDahsboardView() {
  return (
    <div className="relative px-3 my-10">
      <div className="flex space-x-2 items-center -mb-10">
        <MdNewLabel className="text-2xl" />
        <h1 className="font-semibold">Add New Product Form</h1>
      </div>
      <div className="sticky top-1 z-10 mx-1 flex items-center justify-between">
        <div className="ml-auto bg-primary-opacity backdrop-blur-xl p-1 rounded-xl">
          <div className="flex gap-1 text-xs sm:text-sm">
            <Button className="flex-none border border-orange-800 dark:text-orange-700 dark:border-orange-700 text-orange-800 hover:border-orange-700 hover:text-white w-fit! rounded-xl! shadow">
              <div className="flex items-center space-x-3">
                <IoDocumentText className="text-xl" />
                <p>Save Draft</p>
              </div>
            </Button>
            <Button
              type="submit"
              className="bg-orange-800 flex-none w-fit! rounded-xl! shadow"
            >
              <div className="flex items-center space-x-3">
                <IoDuplicate className="text-xl" />
                <p>Add Product</p>
              </div>
            </Button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-[2fr_1fr] gap-5 mt-5">
        <AddProductForm />
        <div>
          <div className="bg-black/5 dark:bg-white/5 rounded-2xl w-full h-125 p-3">
            <h1 className="opacity-50">Upload Photo</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
