'use client';
import NumberFieldForm from '@/views/components/formik/numberFieldForm';
import { Form, Formik, FormikProps } from 'formik';
import { PriceFilterSchema } from '../schemas';
import { TiMinus } from 'react-icons/ti';
import { useQueryParams } from '../hooks/useQueryParams';

interface IPriceFilter {
  priceFrom: string;
  priceTo: string;
}

export default function PriceFilterForm() {
  const { createParams } = useQueryParams();

  return (
    <div>
      <Formik
        initialValues={{
          priceFrom: '',
          priceTo: '',
        }}
        validationSchema={PriceFilterSchema}
        onSubmit={(values, { resetForm }) => {
          createParams(
            { price: `${values.priceFrom}-${values.priceTo}` },
            { append: false },
          );
          resetForm();
        }}
      >
        {(props: FormikProps<IPriceFilter>) => {
          const { values, handleChange, handleSubmit } = props;
          return (
            <Form onSubmit={handleSubmit}>
              <div className="flex flex-col md:flex-row items-center">
                <div className="w-46 md:w-26 lg:w-30">
                  <NumberFieldForm
                    handleChange={handleChange}
                    values={values.priceFrom}
                    name={'priceFrom'}
                    sortLabel="Price From"
                  />
                </div>
                <div className="hidden md:block">
                  <TiMinus className="text-lg flex-none" />
                </div>
                <div className="w-46 md:w-26 lg:w-30">
                  <NumberFieldForm
                    handleChange={handleChange}
                    values={values.priceTo}
                    name={'priceTo'}
                    sortLabel="Price To"
                  />
                </div>
              </div>
              <button
                className="px-3 py-1 text-sm rounded-full text-[#ededed] flex items-center cursor-pointer bg-orange-800 mt-2 ml-auto"
                type="submit"
                aria-label="Apply price filter"
              >
                Apply
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
