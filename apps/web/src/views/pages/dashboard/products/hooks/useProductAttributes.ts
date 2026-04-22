import { useFormikContext } from 'formik';
import { IProductAttribute, IProductFormValues } from '../types';

export function useProductAttributes() {
  const { values, setFieldValue } = useFormikContext<IProductFormValues>();

  const setValue = (
    attributeId: number,
    value: number[],
    imageBased: boolean = false,
  ) => {
    const current = values.productAttributes || [];

    const index = current.findIndex((a) => a.attributeId === attributeId);

    let next = [...current];

    if (index === -1) {
      next.push({
        attributeId,
        values: value,
        imageBased,
      });
    } else {
      next[index] = {
        ...next[index],
        values: value,
        imageBased: next[index].imageBased ?? imageBased,
      };
    }

    if (imageBased) {
      next = next.map((attr) => ({
        ...attr,
        imageBased: attr.attributeId === attributeId,
      }));
    }

    setFieldValue('productAttributes', next);
  };

  const resetImages = () => {
    const currentImages = values.images || [];
    const filteredImages = currentImages.filter((img) => {
      return img.attributeValueId === 0;
    });

    setFieldValue('images', filteredImages);
  };

  const setImageBased = (attributeId: number, enabled: boolean) => {
    const current = values.productAttributes || [];

    const nextAttributes = current.map((attr) => ({
      ...attr,
      imageBased: enabled ? attr.attributeId === attributeId : false,
    }));

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
