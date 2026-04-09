import Button from '@/views/components/button';
import ModalContainer from '@/views/components/modalContainer';
import { TbHttpDelete } from 'react-icons/tb';
import useActions from '../hooks/useActions';

interface IDeleteMOdal {
  closeModal: () => void;
  modalHandler: () => void;
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
  closeModal,
  modalHandler,
}: IDeleteMOdal) {
  const { archive, deleteHandler, deleteVariant, updateVariant } = useActions(
    id,
    closeModal,
  );

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

              <Button
                className="bg-dark"
                onClick={() =>
                  isVariant ? updateVariant({ isActive: false }) : archive(true)
                }
              >
                Archive
              </Button>
            </div>
          </div>
        </ModalContainer>
      )}
    </>
  );
}
