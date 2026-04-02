import axiosInstanceClient from '@/lib/axios/client';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { IVariant } from '../../p/types/product.types';
import { IVariantAttribute } from '../types';
import { AddToCartSchema } from '../../p/schema';
import { RefObject } from 'react';
import { ValidationError } from 'yup';
import { IErrorsMessageHandle } from '../../p/components/errors';

interface IUseChange {
  selectedVariant: IVariant | null | undefined;
  cartItemVariant: IVariantAttribute | undefined;
  selectedAttributes: Record<number, number>;
  quantities: Record<number, number>;
  errorsModalRef?: RefObject<IErrorsMessageHandle>;
  errorsRefs?: React.MutableRefObject<
    Record<number, IErrorsMessageHandle | null>
  >;
  updateQuantity: (variantId: number, newQty: number) => void;
  showVariantsHandler: () => void;
}

export default function useChangeVariant({
  selectedVariant,
  cartItemVariant,
  selectedAttributes,
  quantities,
  errorsModalRef,
  errorsRefs,
  updateQuantity,
  showVariantsHandler,
}: IUseChange) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const confirmHandler = async () => {
    if (selectedVariant && cartItemVariant) {
      if (selectedVariant.id === cartItemVariant.variantId) {
        updateQuantity(
          cartItemVariant.variantId,
          quantities[cartItemVariant.variantId],
        );
        showVariantsHandler();
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
            `/shop-cart/change/${cartItemVariant.variantId}`,
            {
              data: {
                newProductId: selectedVariant.id,
                quantity: quantities[selectedVariant.id],
                unitPrice: selectedVariant.price,
              },
            },
          );

          if (!data.success) {
            errorsModalRef?.current?.showMessage({ errors: [data.message] });
            return;
          }

          queryClient.invalidateQueries({ queryKey: ['cart'] });
          queryClient.setQueryData(['cartLastAdded'], data.addQuantity ?? 0);
          errorsModalRef?.current?.showMessage({ success: data.message });
          errorsRefs?.current[cartItemVariant.variantId]?.showMessage({
            success: data.message,
          });
          showVariantsHandler();
          router.refresh();
        } catch (err: any) {
          const messages =
            err instanceof ValidationError
              ? [...new Set(err.errors)]
              : ['Something went wrong'];

          errorsModalRef?.current?.showMessage({ errors: messages });
        }
      }
    }
  };

  return { confirmHandler };
}
