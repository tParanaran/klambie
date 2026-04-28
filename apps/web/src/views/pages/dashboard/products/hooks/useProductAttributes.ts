import { useFormikContext } from 'formik';
import { IProductAttribute, IProductFormValues } from '../types';

export function useProductAttributes() {
  const { values, setFieldValue } = useFormikContext<IProductFormValues>();

  const setValue = (attributeId: number, value: number[]) => {
    const current = values.productAttributes || [];

    const existing = current.find((a) => a.attributeId === attributeId);

    let updated;

    if (existing) {
      updated = current.map((a) =>
        a.attributeId === attributeId
          ? {
              ...a,
              values: value,
              imageBased: a.imageBased ?? false,
            }
          : a,
      );
    } else {
      updated = [
        ...current,
        {
          attributeId,
          values: value,
          imageBased: false,
        },
      ];
    }

    setFieldValue('productAttributes', updated);
  };

  const resetImages = () => {
    const currentImages = values.images || [];

    const filteredImages = currentImages.filter(
      (img) => !img.attributeValueId || img.attributeValueId === 0,
    );

    setFieldValue('images', filteredImages);
  };

  const setImageBased = (attributeId: number, enabled: boolean) => {
    const current = values.productAttributes || [];

    const nextAttributes = current.map((attr) => {
      if (enabled) {
        return {
          ...attr,
          imageBased: attr.attributeId === attributeId,
        };
      }

      if (attr.attributeId === attributeId) {
        return {
          ...attr,
          imageBased: false,
        };
      }

      return attr;
    });

    setFieldValue('productAttributes', nextAttributes);
    resetImages();
  };

  const resetAttributesImages = () => {
    const current = values.productAttributes || [];

    const next = current.map((attr) => ({
      ...attr,
      imageBased: false,
    }));

    setFieldValue('productAttributes', next);
    resetImages();
  };

  const deleteAttributes = (attributeId: number) => {
    const updatedAttributes = values.productAttributes.filter(
      (attr: IProductAttribute) => attr.attributeId !== attributeId,
    );

    setFieldValue('productAttributes', updatedAttributes);
  };

  const toggleVariantAttribute = (attributeId: number) => {
    const current = values.variantAttributeIds || [];

    const exists = current.includes(attributeId);

    const updated = exists
      ? current.filter((id: number) => id !== attributeId)
      : [...current, attributeId];

    setFieldValue('variantAttributeIds', updated);
  };

  console.log(values);

  return {
    values,
    deleteAttributes,
    setValue,
    setImageBased,
    toggleVariantAttribute,
    resetAttributesImages,
  };
}
