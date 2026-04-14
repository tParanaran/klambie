import { useFormikContext } from 'formik';
import { IProductAttribute, IProductFormValues } from '../types';

export function useProductAttributes() {
  const { values, setFieldValue } = useFormikContext<IProductFormValues>();

  const setValue = (
    attributeId: number,
    value: number | null,
    imageBased: boolean = false,
  ) => {
    const current = values.productAttributes || [];

    const index = current.findIndex(
      (a: IProductAttribute) => a.attributeId === attributeId,
    );

    let next = [...current];

    if (value === null) {
      next = current.filter(
        (a: IProductAttribute) => a.attributeId !== attributeId,
      );
    } else if (index === -1) {
      next.push({
        attributeId,
        imageBased,
      });
    } else {
      next[index] = {
        ...next[index],
        imageBased,
      };
    }

    setFieldValue('productAttributes', next);
  };

  return { setValue, values };
}
