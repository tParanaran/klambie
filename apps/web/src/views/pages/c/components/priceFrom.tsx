'use client';
import NumberFieldForm from '@/views/components/formik/numberFieldForm';
import { Form, Formik, FormikProps } from 'formik';
import { PriceFilterSchema } from '../schemas';
import { TiMinus } from 'react-icons/ti';
import { useQueryParams } from '../hooks/useQueryParams';
import useDetectIsMobile from '../../template/hooks/useDetectIsMobile';

interface IPriceFilter {
  priceFrom: string;
  priceTo: string;
}

export default function PriceFilterForm() {
  const { createParams } = useQueryParams();
  const { isMobile } = useDetectIsMobile({ widthScreen: 500 });

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
              <div className="flex flex-row sm:flex-col md:flex-row items-center flex-wrap">
                <div className={`w-24 sm:w-46 md:w-26 lg:w-30 flex-2`}>
                  <NumberFieldForm
                    handleChange={handleChange}
                    values={values.priceFrom}
                    name={'priceFrom'}
                    sortLabel="Price From"
                  />
                </div>
                <div className="block sm:hidden md:block">
                  <TiMinus className="text-lg flex-none" />
                </div>
                <div className={`w-24 sm:w-46 md:w-26 lg:w-30 flex-2`}>
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
