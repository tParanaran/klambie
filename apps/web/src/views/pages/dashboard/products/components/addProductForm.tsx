import { Form, Formik, FormikProps } from 'formik';
import { IProductFormValues } from '../types';
import { initialAddProductValues } from '@/utils/addProduct';
import {
  AdvanceTabSchema,
  GeneralTabSchema,
  productValidationSchema,
} from '../schema';
import { validateTabs } from '@/utils/validateTabs';
import { RefObject, useState } from 'react';
import Tabs, { TabType } from './tabs';
import TabPanel from '@/views/components/tabPanel';
import GeneralTab from './generalTab';
import AdvanceTab from './advanceTab';
import VariantsTab from './variantsTab';
import { generateAndMergeVariants } from '@/utils/generateProductVariants';

interface IAddProductForm {
  formikRef: RefObject<FormikProps<IProductFormValues>>;
}

export default function AddProductForm({ formikRef }: IAddProductForm) {
  const [tab, setTab] = useState<TabType>('GENERAL');

  return (
    <Formik
      innerRef={formikRef}
      initialValues={initialAddProductValues}
      validationSchema={productValidationSchema}
      onSubmit={(values) => {}}
    >
      {(props: FormikProps<IProductFormValues>) => {
        const handleChangeTab = async (nextTab: TabType) => {
          if (tab === 'GENERAL' && nextTab === 'DETAILS') {
            const isValid = await validateTabs(props, GeneralTabSchema);
            if (!isValid) return;
          }

          if (
            (tab === 'DETAILS' || tab === 'GENERAL') &&
            nextTab === 'VARIANTS'
          ) {
            const isValid = await validateTabs(props, AdvanceTabSchema);

            if (!isValid) return;

            const variants = generateAndMergeVariants(props.values);
            props.setFieldValue('productVariants', variants);
          }

          setTab(nextTab);
        };
        const { handleSubmit, values } = props;
        return (
          <div>
            <Tabs
              setTab={handleChangeTab}
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
