import { useEffect, useState } from 'react';
import { IVariantsDashboard } from '../types';

export function useVariantActions() {
  const [isChildren, setIsChildren] = useState<boolean>(false);
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

  useEffect(() => {
    if (showDelete || showEdit) {
      setIsChildren(true);
    } else {
      setIsChildren(false);
    }
  }, [showEdit, showDelete]);

  return {
    selectedVariant,
    showDelete,
    showEdit,
    modalHandler,
    closeModal,
    openDelete,
    openEdit,
    isChildren,
  };
}
