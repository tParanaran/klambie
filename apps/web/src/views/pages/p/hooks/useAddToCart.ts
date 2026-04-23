import { RefObject, useEffect, useState } from 'react';
import { getAddToCartSchema } from '../schema';
import { ValidationError } from 'yup';
import { IVariant } from '../types/product.types';
import { useQueryClient } from '@tanstack/react-query';
import { IErrorsMessageHandle } from '../components/errors';
import axiosInstanceClient from '@/lib/axios/client';
import { Parse } from '@/utils/parse';

interface IAddToCart {
  quantity: number;
  selectedAttributes: Record<number, number>;
  selectedVariant: IVariant | null | undefined;
  errorsProductRef?: RefObject<IErrorsMessageHandle>;
  hasVariants: boolean;
}

export default function useAddToCart({
  quantity,
  selectedAttributes,
  selectedVariant,
  errorsProductRef,
  hasVariants,
}: IAddToCart) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      const schema = getAddToCartSchema(hasVariants);

      await schema.validate(
        { quantity, selectedAttributes, selectedVariant },
        { abortEarly: false },
      );

      if (selectedVariant) {
        const { data } = await axiosInstanceClient.post('/shop-cart/add', {
          productVariantId: selectedVariant.id,
          quantity: quantity,
          unitPrice: Parse(selectedVariant.price.finalPrice),
        });

        if (!data.success) {
          errorsProductRef?.current?.showMessage({ errors: [data.message] });
          return;
        }

        queryClient.invalidateQueries({ queryKey: ['cart'] });
        queryClient.setQueryData(['cartLastAdded'], data.addQuantity ?? 0);
        errorsProductRef?.current?.showMessage({ success: data.message });
      }
    } catch (err: any) {
      const messages =
        err instanceof ValidationError
          ? [...new Set(err.errors)]
          : ['Something went wrong'];

      errorsProductRef?.current?.showMessage({ errors: messages });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    errorsProductRef?.current?.showMessage({ errors: [] });
  }, [selectedVariant, quantity, selectedAttributes]);

  return { handleAddToCart, isLoading };
}
