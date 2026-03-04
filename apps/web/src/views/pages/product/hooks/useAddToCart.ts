import { useEffect, useState } from 'react';
import { AddToCartSchema } from '../schema';
import { ValidationError } from 'yup';
import { IVariant } from '../types/product.types';
import UseCart from './useCart';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface IAddToCart {
  quantity: number;
  selectedAttributes: Record<number, number>;
  selectedVariant: IVariant | null | undefined;
}

export default function UseAddToCart({
  quantity,
  selectedAttributes,
  selectedVariant,
}: IAddToCart) {
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<string>('');
  const { addToCart } = UseCart();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addToCart,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      queryClient.setQueryData(['cartLastAdded'], response.addQuantity ?? 0);

      console.log('TQYGHJQDBJQDHBK', response.addQuantity);
    },
  });
  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      await AddToCartSchema.validate(
        { selectedAttributes, selectedVariant, quantity },
        { abortEarly: false },
      );

      const cart = {
        productVariantId: selectedVariant!.id,
        unitPrice: selectedVariant!.price.finalPrice,
        quantity: quantity,
      };

      const result = await mutation.mutateAsync(cart);

      if (!result.success) {
        setErrors([result.message!]);
        return;
      }

      setErrors([]);
      setSuccess('');
      setTimeout(() => setSuccess(result.message!), 0);
    } catch (err: any) {
      if (!(err instanceof ValidationError)) return;

      const uniqueErrors = Array.from(new Set(err.errors));
      setErrors(uniqueErrors);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setErrors([]);
  }, [selectedVariant, quantity, selectedAttributes]);

  return { handleAddToCart, errors, isLoading, success };
}
