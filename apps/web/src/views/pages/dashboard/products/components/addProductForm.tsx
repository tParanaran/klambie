import TextFieldForm from '@/views/components/formik/textFieldForm';
import { Form, Formik, FormikProps } from 'formik';
import { IProductFormValues } from '../types';
import { initialAddProductValues } from '@/utils/addProduct';
import { productValidationSchema } from '../schema';
import { RefObject } from 'react';
import TextAreaFieldForm from '@/views/components/formik/textAreaFieldForm';
import NumberFieldForm from '@/views/components/formik/numberFieldForm';
import useAttribute from '@/views/pages/c/hooks/useAttribute';
import SelectForm from '@/views/components/formik/selectForm';

interface IAddProductForm {
  formikRef: RefObject<FormikProps<IProductFormValues>>;
}

export default function AddProductForm({ formikRef }: IAddProductForm) {
  const { brandOptions, tags } = useAttribute();

  return (
    <Formik
      innerRef={formikRef}
      initialValues={initialAddProductValues}
      validationSchema={productValidationSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {(props: FormikProps<IProductFormValues>) => {
        const { values, handleChange, handleSubmit } = props;
        return (
          <Form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
              <div>
                <div className="bg-black/5 dark:bg-white/5 rounded-2xl w-full  p-3">
                  <h1 className="opacity-50">General Information</h1>
                  <div className="text-sm">
                    <TextFieldForm
                      handleChange={handleChange}
                      values={values.name}
                      name={'name'}
                      label={'Name'}
                      placeholder="Type product name here"
                    />
                    <TextAreaFieldForm
                      handleChange={handleChange}
                      values={values.productDetails.description}
                      name={'productDetails.description'}
                      label={'Description'}
                    />

                    <div className="flex lg:flex-row md:flex-col sm:flex-row flex-col space-x-3">
                      <SelectForm
                        name={'brandId'}
                        label="Brand"
                        options={brandOptions}
                        placeholder="Select product brand here"
                      />
                      <NumberFieldForm
                        handleChange={handleChange}
                        values={values.productDetails.weight}
                        name="productDetails.weight"
                        label="Weight"
                        placeholder="Type product weight here"
                      />
                    </div>
                    <SelectForm
                      name={'productTags'}
                      label="Tag"
                      options={tags}
                      isMutipleSelect={true}
                      placeholder="Select product tags here"
                    />
                  </div>
                </div>
                <div className="bg-black/5 dark:bg-white/5 rounded-2xl w-full p-3 mt-5">
                  <h1 className="opacity-50">Pricing And Stock</h1>
                  <div className="text-sm flex lg:flex-row md:flex-col sm:flex-row flex-col space-x-3">
                    <NumberFieldForm
                      handleChange={handleChange}
                      values={values.basePrice}
                      name="basePrice"
                      label="Price"
                    />
                    <NumberFieldForm
                      handleChange={handleChange}
                      values={values.productVariants[0].stock}
                      name={'productVariants[0].stock'}
                      label="Stock"
                    />
                  </div>
                </div>
              </div>
              <div>
                <div className="bg-black/5 dark:bg-white/5 rounded-2xl w-full p-3">
                  <h1 className="opacity-50">Upload Photo</h1>
                </div>
                <div className="bg-black/5 dark:bg-white/5 rounded-2xl w-full p-3 mt-5">
                  <h1 className="opacity-50">Categories</h1>
                </div>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
