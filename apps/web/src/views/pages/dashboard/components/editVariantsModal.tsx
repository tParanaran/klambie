import Button from '@/views/components/button';
import ModalContainer from '@/views/components/modalContainer';
import ToastMessage from '@/views/components/toastMessage';
import useActions from '../hooks/useActions';
import { TbHttpPatch } from 'react-icons/tb';
import { Form, Formik, FormikProps } from 'formik';
import { EditVariants } from '../schema';
import NumberFieldForm from '@/views/components/formik/numberFieldForm';
import { IVariantsDashboard } from '../types';

interface IVariantEdit {
  stock: number;
  basePrice: number;
}

interface IEditModal {
  closeModal: () => void;
  modalHandler: () => void;
  variant: IVariantsDashboard;
  showModal: boolean;
}

export default function EditVariantsModal({
  closeModal,
  modalHandler,
  variant,
  showModal,
}: IEditModal) {
  const { productVariantId, name, stock, price } = variant;
  const { toast, updateVariant } = useActions(productVariantId, closeModal);

  return (
    <>
      {showModal && (
        <ModalContainer
          handlerModal={modalHandler}
          showModal={showModal}
          isFilter={true}
          style="w-full top-1/3 fixed h-full fixed z-50"
        >
          <div className="w-xs bg-secondary-opacity backdrop-blur-xl rounded-2xl p-5 mx-auto text-sm">
            <Formik
              initialValues={{ stock, basePrice: parseInt(price) }}
              validationSchema={EditVariants}
              onSubmit={(values) => {
                updateVariant({
                  basePrice: Number(values.basePrice),
                  stock: Number(values.stock),
                });
              }}
            >
              {(props: FormikProps<IVariantEdit>) => {
                const { values, handleChange, handleSubmit } = props;
                return (
                  <Form onSubmit={handleSubmit}>
                    <div className="text-center">
                      <div className="p-3 bg-green-700 rounded-full inline-block text-light mb-2">
                        <TbHttpPatch className="text-4xl" />
                      </div>
                      <h1 className="text-base text-red-800 font-semibold">
                        Update {name} Variant
                      </h1>
                    </div>

                    <div className="text-left my-5">
                      <div>
                        <NumberFieldForm
                          handleChange={handleChange}
                          values={values.basePrice}
                          label="Price"
                          name={'basePrice'}
                          sortLabel="Price"
                        />
                      </div>
                      <div className="mt-2">
                        <NumberFieldForm
                          handleChange={handleChange}
                          values={values.stock}
                          label="Stock"
                          name={'stock'}
                          sortLabel="Stock"
                        />
                      </div>
                    </div>

                    <div className="flex space-x-1">
                      <Button className="bg-emerald-700" type="submit">
                        Save
                      </Button>
                      <Button className="bg-red-800" onClick={modalHandler}>
                        Cancel
                      </Button>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </ModalContainer>
      )}
      {toast.visible && (
        <ToastMessage {...toast} style="fixed bottom-3 right-3" />
      )}
    </>
  );
}
