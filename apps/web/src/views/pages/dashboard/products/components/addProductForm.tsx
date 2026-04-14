import { Form, Formik, FormikProps } from 'formik';
import { IProductFormValues } from '../types';
import { initialAddProductValues } from '@/utils/addProduct';
import { productValidationSchema } from '../schema';
import { RefObject, useState } from 'react';
import Tabs, { TabType } from './tabs';
import TabPanel from '@/views/components/tabPanel';
import GeneralTab from './generalTab';
import AdvanceTab from './advanceTab';
import CreateVariantModal from './createVariantsModal';
import { validateGeneralTab } from '@/utils/validateGeneralTab';

interface IAddProductForm {
  formikRef: RefObject<FormikProps<IProductFormValues>>;
}

export default function AddProductForm({ formikRef }: IAddProductForm) {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [tab, setTab] = useState<TabType>('GENERAL');

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
        const handleChangeTab = async (nextTab: TabType) => {
          if (tab === 'GENERAL' && nextTab === 'DETAILS') {
            const isValid = await validateGeneralTab(props);
            if (!isValid) return;
          }

          setTab(nextTab);
        };
        const { handleSubmit, values } = props;
        return (
          <div>
            <Tabs
              setTab={handleChangeTab}
              tab={tab}
              hasVariants={
                values.type === 'VARIANT' && values.productVariants.length > 0
              }
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
                  <AdvanceTab
                    onOpen={() => setOpenModal(true)}
                    isReady={
                      Number(values.basePrice) > 0 &&
                      Number(values.baseStock) > 0
                    }
                  />
                </TabPanel>
                <TabPanel active={tab === 'VARIANTS'}>
                  <div></div>
                </TabPanel>
              </div>
              {openModal && (
                <CreateVariantModal
                  onClose={() => setOpenModal(false)}
                  onDone={() => setTab('VARIANTS')}
                  handlerModal={() => setOpenModal(!openModal)}
                  showModal={openModal}
                />
              )}
            </Form>
          </div>
        );
      }}
    </Formik>
  );
}
