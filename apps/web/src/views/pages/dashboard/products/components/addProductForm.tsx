import { Form, Formik, FormikProps } from 'formik';
import { IProductFormValues } from '../types';
import { initialAddProductValues } from '@/utils/addProduct';
import {
  AdvanceTabSchema,
  GeneralTabSchema,
  productValidationSchema,
} from '../schema';
import { validateTabs } from '@/utils/validateTabs';
import { RefObject, useMemo, useState } from 'react';
import Tabs, { TabType } from './tabs';
import { generateAndMergeVariants } from '@/utils/generateProductVariants';
import { normalizeProductPayload } from '@/utils/normalizeProductPayload';
import { useToastStore } from '@/store/toastStore';
import { useRouter } from 'next/navigation';
import TabPanel from '@/views/components/tabPanel';
import GeneralTab from './generalTab';
import AdvanceTab from './advanceTab';
import VariantsTab from './variantsTab';
import axiosInstanceClient from '@/lib/axios/client';

interface IAddProductForm {
  formikRef: RefObject<FormikProps<IProductFormValues>>;
  submitType: 'ACTIVE' | 'DRAFT';
  mode: 'CREATE' | 'EDIT';
  product?: IProductFormValues;
}

export default function AddProductForm({
  formikRef,
  submitType,
  mode,
  product,
}: IAddProductForm) {
  const [tab, setTab] = useState<TabType>('GENERAL');
  const router = useRouter();
  const showToast = useToastStore((s) => s.showToast);

  const initialValues = useMemo(() => {
    if (mode === 'EDIT' && product) {
      return product;
    }
    return initialAddProductValues;
  }, [mode, product]);

  const getValidationSchema = () =>
    submitType === 'DRAFT' && mode === 'CREATE'
      ? GeneralTabSchema
      : productValidationSchema;

  const shouldGenerateVariants = (values: IProductFormValues) => {
    return !values.productVariants || values.productVariants.length <= 1;
  };

  const handleChangeTab = async (
    nextTab: TabType,
    props: FormikProps<IProductFormValues>,
  ) => {
    if (submitType === 'DRAFT' && mode === 'CREATE') {
      setTab(nextTab);
      return;
    }

    if (tab === 'GENERAL' && nextTab === 'DETAILS') {
      const isValid = await validateTabs(props, GeneralTabSchema);
      if (!isValid) return;
    }

    if ((tab === 'GENERAL' || tab === 'DETAILS') && nextTab === 'VARIANTS') {
      const isValid = await validateTabs(props, AdvanceTabSchema);
      if (!isValid) return;

      if (shouldGenerateVariants(props.values)) {
        const variants = generateAndMergeVariants(props.values);
        props.setFieldValue('productVariants', variants);
      }
    }

    setTab(nextTab);
  };

  const handleSubmit = async (values: IProductFormValues, helpers: any) => {
    const { setSubmitting, setErrors, resetForm } = helpers;

    try {
      const payload = normalizeProductPayload(values);

      const url =
        mode === 'CREATE' ? '/product/new' : `/product/edit/${product?.id}`;
      const method = mode === 'CREATE' ? 'post' : 'patch';

      const { data } = await axiosInstanceClient[method](url, {
        ...payload,
        status: submitType,
      });

      if (submitType === 'ACTIVE') {
        resetForm();
        router.push('/dashboard/products');
      }

      showToast({
        message: data.message,
        type: 'success',
      });
    } catch (err: any) {
      if (err?.response?.data?.errors) {
        setErrors(err.response.data.errors);
      }

      showToast({
        message:
          err?.response?.data?.message ||
          err.message ||
          'Something went wrong while creating product.',
        type: 'error',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      innerRef={formikRef}
      initialValues={initialValues}
      enableReinitialize
      validationSchema={getValidationSchema()}
      onSubmit={handleSubmit}
    >
      {(props) => {
        const { handleSubmit, values } = props;

        return (
          <div>
            <Tabs
              setTab={(next) => handleChangeTab(next, props)}
              tab={tab}
              isHide={values.type === 'NO_VARIANT' || values.type === null}
            />

            <Form
              onSubmit={handleSubmit}
              className="max-h-[75vh] overflow-y-scroll scrollbar-hide"
            >
              <div className="relative mb-5">
                <TabPanel active={tab === 'GENERAL'}>
                  <GeneralTab />
                </TabPanel>

                <TabPanel active={tab === 'DETAILS'}>
                  <AdvanceTab />
                </TabPanel>

                <TabPanel active={tab === 'VARIANTS'}>
                  <VariantsTab />
                </TabPanel>
              </div>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
}
