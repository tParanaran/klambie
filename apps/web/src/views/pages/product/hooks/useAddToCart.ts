import { useEffect, useState } from 'react';
import { AddToCartSchema } from '../schema';
import { ValidationError } from 'yup';
import { IVariant } from '../types/product.types';

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
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      await AddToCartSchema.validate(
        { selectedAttributes, selectedVariant, quantity },
        { abortEarly: false },
      );

      console.log({ variantId: selectedVariant!.id, quantity });

      // const result = await  //addToCart(selectedVariant.id,quantity,selectedVariant.stock,);

      // if (!result.success) {
      //   setErrors([result.message!]);
      //   return;
      // }

      setErrors([]);
      setShowModal(true);
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

  return { handleAddToCart, errors, isLoading, showModal };
}
