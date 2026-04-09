'use client';
import { useState } from 'react';
import {
  IGroupedAttribute,
  IImages,
  IVariant,
} from '../../p/types/product.types';
import axiosInstanceClient from '@/lib/axios/client';
import { useToastStore } from '@/store/toastStore';

interface IVariantData {
  variants: IVariant[];
  variantImages: IImages[];
  groupedAttributes: IGroupedAttribute[];
  name: string;
  quantity: number;
}

export default function useVariants() {
  const showToast = useToastStore((s) => s.showToast);
  const [variants, setVariants] = useState<IVariantData | null>(null);
  const [showVariants, setShowVariants] = useState(false);

  const variantHandler = async (
    slug: string,
    name: string,
    quantity?: number,
  ) => {
    try {
      const { data } = await axiosInstanceClient.get(
        `/product/variants/${slug}`,
      );
      setVariants({ ...data, name, quantity: quantity ?? 1 });
      setShowVariants(true);
    } catch (error) {
      showToast({
        type: 'error',
        message:
          error instanceof Error
            ? error.message
            : 'Something went wrong while fetching items',
      });
    }
  };

  const showVariantsHandler = () => {
    setShowVariants(!showVariants);
  };

  return {
    variants,
    showVariants,
    showVariantsHandler,
    variantHandler,
  };
}
