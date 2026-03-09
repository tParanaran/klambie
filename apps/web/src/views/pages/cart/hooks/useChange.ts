import axiosInstanceClient from '@/lib/axios/client';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { IVariant } from '../../product/types/product.types';
import { IVariantAttribute } from '../types';
import { AddToCartSchema } from '../../product/schema';
import { Dispatch, SetStateAction } from 'react';
import { ValidationError } from 'yup';

type Message = {
  success?: string;
  errors?: string[];
};

type Messages = Record<number, Message>;

export default function useChangeVariant(
  selectedVariant: IVariant | null | undefined,
  cartItem: IVariantAttribute | undefined,
  selectedAttributes: Record<number, number>,
  quantities: Record<number, number>,
  updateQuantity: (variantId: number, newQty: number) => void,
  setMessages: Dispatch<SetStateAction<Messages>>,
  setShowVariants: Dispatch<SetStateAction<boolean>>,
) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const confirmHandler = async () => {
    if (selectedVariant && cartItem) {
      if (selectedVariant.id === cartItem.variantId) {
        updateQuantity(cartItem.variantId, quantities[cartItem.variantId]);
        setShowVariants(false);
      } else {
        try {
          await AddToCartSchema.validate(
            {
              selectedAttributes,
              selectedVariant,
              quantity: quantities[selectedVariant.id],
            },
            { abortEarly: false },
          );

          const { data } = await axiosInstanceClient.patch(
            `/shop-cart/change/${cartItem.variantId}`,
            {
              data: {
                newProductId: selectedVariant.id,
                quantity: quantities[selectedVariant.id],
                unitPrice: selectedVariant.price,
              },
            },
          );

          const isSuccess = data.success;
          const text = data.message;

          (setMessages((prev) => ({
            ...prev,
            [selectedVariant.id]: isSuccess
              ? { success: '', errors: [] }
              : { success: '', errors: [] },
          })),
            setTimeout(
              () =>
                setMessages((prev) => ({
                  ...prev,
                  [selectedVariant.id]: isSuccess
                    ? { success: text, errors: [] }
                    : { success: '', errors: [text] },
                })),
              0,
            ));
          if (isSuccess) {
            queryClient.invalidateQueries({ queryKey: ['cart'] });
            queryClient.setQueryData(['cartLastAdded'], data.addQuantity ?? 0);
            setShowVariants(false);
            router.refresh();
          }
        } catch (err: any) {
          setMessages((prev) => ({
            ...prev,
            [selectedVariant.id]: {
              success: '',
              errors:
                err instanceof ValidationError
                  ? [...new Set(err.errors)]
                  : ['Something went wrong'],
            },
          }));
        }
      }
    }
  };

  return { confirmHandler };
}
