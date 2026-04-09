'use client';
import { IVariantsDashboard } from '../types';
import DeleteModal from './deleteModal';
import EditVariantsModal from './editVariantsModal';

interface IVariantsModal {
  selectedVariant: IVariantsDashboard | null;
  showDelete: boolean;
  showEdit: boolean;
  closeModal: () => void;
  modalHandler: () => void;
}

export default function VariantsModal({
  selectedVariant,
  showDelete,
  showEdit,
  closeModal,
  modalHandler,
}: IVariantsModal) {
  if (!selectedVariant) return null;

  return (
    <>
      {selectedVariant && (
        <DeleteModal
          showModal={showDelete}
          closeModal={closeModal}
          modalHandler={modalHandler}
          id={selectedVariant.productVariantId}
          name={selectedVariant.name}
          isVariant={true}
        />
      )}
      {selectedVariant && (
        <EditVariantsModal
          closeModal={closeModal}
          modalHandler={modalHandler}
          variant={selectedVariant}
          showModal={showEdit}
        />
      )}
    </>
  );
}
