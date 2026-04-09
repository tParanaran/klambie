import { useState } from 'react';
import { IVariantsDashboard } from '../types';

export function useVariantActions() {
  const [selectedVariant, setSelectedVariant] =
    useState<IVariantsDashboard | null>(null);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const openDelete = (variant: IVariantsDashboard) => {
    setSelectedVariant(variant);
    setShowDelete(true);
  };

  const openEdit = (variant: IVariantsDashboard) => {
    setSelectedVariant(variant);
    setShowEdit(true);
  };

  const closeModal = () => {
    setShowEdit(false);
    setShowDelete(false);
  };

  const modalHandler = () => {
    if (showDelete) {
      setShowDelete(!showDelete);
      setShowEdit(showEdit);
    }
    if (showEdit) {
      setShowDelete(showDelete);
      setShowEdit(!showEdit);
    }
  };

  return {
    selectedVariant,
    showDelete,
    showEdit,
    modalHandler,
    closeModal,
    openDelete,
    openEdit,
  };
}
