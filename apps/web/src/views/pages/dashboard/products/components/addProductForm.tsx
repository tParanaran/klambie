import TextFieldForm from '@/views/components/formik/textFieldForm';
import { Form, Formik, FormikProps } from 'formik';
import { IProductFormValues } from '../types';
import { initialAddProductValues } from '@/utils/addProduct';
import { productValidationSchema } from '../schema';
import TextAreaFieldForm from '@/views/components/formik/textAreaFieldForm';
import NumberFieldForm from '@/views/components/formik/numberFieldForm';
import useAttribute from '@/views/pages/c/hooks/useAttribute';
import SelectBrandForm from './brandsSelect';

export default function AddProductForm() {
  const { brandOptions } = useAttribute();

  return (
    <Formik
      initialValues={initialAddProductValues}
      validationSchema={productValidationSchema}
      onSubmit={(values) => {}}
    >
      {(props: FormikProps<IProductFormValues>) => {
        const {
          values,
          handleChange,
          handleSubmit,
          setFieldValue,
          setFieldTouched,
        } = props;
        return (
          <Form onSubmit={handleSubmit}>
            <div className="bg-black/5 dark:bg-white/5 rounded-2xl w-full  p-3">
              <h1 className="opacity-50">General Information</h1>
              <div className="text-sm">
                <TextFieldForm
                  handleChange={handleChange}
                  values={values.name}
                  name={'name'}
                  label={'Name'}
                />
                <TextAreaFieldForm
                  handleChange={handleChange}
                  values={values.productDetails.description}
                  name={'productDetails.description'}
                  label={'Description'}
                />
                <SelectBrandForm
                  name={'brandId'}
                  options={brandOptions}
                  value={values.brandId}
                  onChange={(val) => setFieldValue('brandId', val)}
                  onBlur={() => setFieldTouched('brandId', true)}
                  placeholder="Select product brand here"
                />
              </div>
            </div>
            <div className="bg-black/5 dark:bg-white/5 rounded-2xl w-full p-3 mt-3">
              <h1 className="opacity-50">Pricing And Stock</h1>
              <div className="text-sm flex gap-3">
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
          </Form>
        );
      }}
    </Formik>
  );
}
