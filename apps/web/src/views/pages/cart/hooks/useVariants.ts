'use client';
import { useState } from 'react';
import { IImages, IVariant } from '../../product/types/product.types';
import axiosInstanceClient from '@/lib/axios/client';
import { Notify } from '@/lib/notify';
import { number } from 'yup';

interface IVariantData {
  variants: IVariant[];
  variantImages: IImages[];
  name: string;
  quantity: number;
}

export default function useVariants() {
  const [variants, setVariants] = useState<IVariantData | null>(null);
  const [showVariants, setShowVariants] = useState(false);

  const variantHandler = async (
    slug: string,
    name: string,
    quantity: number,
  ) => {
    try {
      const { data } = await axiosInstanceClient.get(
        `/product/variants/${slug}`,
      );
      setVariants({ ...data, name, quantity });
      setShowVariants(true);
    } catch (error) {
      Notify(error instanceof Error ? error.message : 'Something went wrong');
    }
  };
  return {
    variantHandler,
    variants,
    showVariants,
    setShowVariants,
  };
}
