import NumberFieldForm from '@/views/components/formik/numberFieldForm';
import SelectForm from '@/views/components/formik/selectForm';
import TextAreaFieldForm from '@/views/components/formik/textAreaFieldForm';
import TextFieldForm from '@/views/components/formik/textFieldForm';
import ImageUploader from './imageUploader';
import useAttribute from '@/views/pages/c/hooks/useAttribute';
import SelectCategories from './selectCategories';
import RadioButtonField from '@/views/components/formik/radioButtonField';
import { useEffect } from 'react';
import { useFormikContext } from 'formik';
import { IProductFormValues } from '../types';
import { useProductAttributes } from '../hooks/useProductAttributes';

export default function GeneralTab() {
  const { values, setFieldValue } = useFormikContext<IProductFormValues>();
  const { resetAttributesImages } = useProductAttributes();
  const { brandOptions, tags } = useAttribute();

  useEffect(() => {
    if (values.type === 'NO_VARIANT') {
      setFieldValue('productVariants', [
        {
          barcode: values.barcode,
          basePrice: values.basePrice,
          stock: values.baseStock,
          attributeValueId: [],
        },
      ]);
    }
  }, [values.basePrice, values.baseStock]);

  const handleTypeChange = (value: boolean) => {
    resetAttributesImages();
    if (value) {
      setFieldValue('productVariants', []);
    } else if (!value && values.productVariants.length === 0) {
      setFieldValue('productVariants', [
        {
          barcode: values.barcode || '',
          basePrice: values.basePrice || '',
          stock: values.baseStock || '',
          attributeValueId: [],
        },
      ]);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr] gap-5 mt-5">
      <div className="flex flex-col">
        <div className="bg-black/5 dark:bg-white/5 rounded-2xl w-full h-full p-2 mb-5">
          <h1 className="opacity-50">Categories</h1>
          <div className="text-sm">
            <SelectCategories />
            <div>
              <SelectForm
                name={'productTags'}
                label="Tag"
                options={tags}
                isMutipleSelect={true}
                placeholder="Select product tags here"
              />
            </div>
          </div>
        </div>
        <div className="bg-black/5 dark:bg-white/5 rounded-2xl w-full p-2">
          <h1 className="opacity-50">General Information</h1>
          <div className="text-sm">
            <TextFieldForm
              name="name"
              label="Name"
              placeholder="Type product name here"
            />

            <div className="flex lg:flex-row md:flex-col sm:flex-row flex-col space-x-3">
              <RadioButtonField
                name="type"
                label="Product type"
                options={[
                  { label: 'Has Variants', value: 'VARIANT' },
                  { label: 'Single Product', value: 'NO_VARIANT' },
                ]}
                onValueChange={handleTypeChange}
              />
              <div className="grow min-w-fit">
                <SelectForm
                  name="brandId"
                  label="Brand"
                  options={brandOptions}
                  placeholder="Select product brand here"
                />
              </div>
            </div>
            <TextAreaFieldForm
              name="productDetails.description"
              label="Description"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="bg-black/5 dark:bg-white/5 rounded-2xl w-full p-2">
          <h1 className="opacity-50">Main Images</h1>
          <ImageUploader />
        </div>
        <div className="bg-black/5 dark:bg-white/5 rounded-2xl w-full p-2 mt-5 h-full">
          <h1 className="opacity-50">Dimensions</h1>
          <div className="text-sm">
            <NumberFieldForm
              name="productDetails.weight"
              label="Weight"
              placeholder="Type product weight here"
            />
            <div className="grid grid-cols-2 gap-x-1 sm:gap-x-3">
              <NumberFieldForm name={'productDetails.height'} label="Height" />
              <NumberFieldForm name={'productDetails.width'} label="Width" />
              <NumberFieldForm name={'productDetails.length'} label="Length" />
              <NumberFieldForm name={'productDetails.volume'} label="Volume" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
