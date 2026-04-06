import Button from '@/views/components/button';
import ModalContainer from '@/views/components/modalContainer';
import { TbHttpDelete } from 'react-icons/tb';
import useActions from '../hooks/useActions';
import ToastMessage from '@/views/components/toastMessage';
import { Dispatch, SetStateAction, useEffect } from 'react';

interface IDeleteMOdal {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  id: number;
  name: string;
  showModal: boolean;
  isVariant?: boolean;
}

export default function DeleteModal({
  id,
  name,
  showModal,
  isVariant = false,
  setShowModal,
}: IDeleteMOdal) {
  const { archive, deleteHandler, toast, deleteVariant } = useActions(id);

  const modalHandler = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    if (toast.type === 'success') {
      setShowModal(false);
    }
  }, [toast.visible]);

  return (
    <>
      {showModal && (
        <ModalContainer
          handlerModal={modalHandler}
          showModal={showModal}
          isFilter={true}
          style="w-full top-1/3 fixed h-full"
        >
          <div className="w-xs bg-secondary-opacity backdrop-blur-xl rounded-2xl p-5 mx-auto text-center text-sm">
            <div className="p-3 bg-red-800 rounded-full inline-block text-light mb-2">
              <TbHttpDelete className="text-4xl" />
            </div>
            <h1 className="text-base sm:text-lg font-semibold text-red-800">
              Are you sure want to delete?
            </h1>
            <p className="my-5">
              Deleting this <span className="font-semibold">{name}</span> will
              result to permanent removal. You can archive instead.
            </p>
            <div className="flex space-x-1">
              <Button
                className="bg-red-800"
                onClick={isVariant ? deleteVariant : deleteHandler}
              >
                Delete
              </Button>
              <Button className="bg-emerald-700" onClick={modalHandler}>
                Cancel
              </Button>
              {!isVariant && (
                <Button className="bg-dark" onClick={archive}>
                  Archive
                </Button>
              )}
            </div>
          </div>
        </ModalContainer>
      )}
      {toast.visible && (
        <ToastMessage {...toast} style="fixed bottom-3 right-3" />
      )}
    </>
  );
}
