import { useProductAttributes } from '../hooks/useProductAttributes';
import { IProductAttribute } from '../types';
import NumberFieldForm from '@/views/components/formik/numberFieldForm';
import TextAreaFieldForm from '@/views/components/formik/textAreaFieldForm';
import useAttribute from '@/views/pages/c/hooks/useAttribute';
import SelectForm from '@/views/components/formik/selectForm';
import ErrorForm from '@/views/components/formik/errorForm';
import CheckBox from '@/views/components/checkBox';
import TextFieldForm from '@/views/components/formik/textFieldForm';

export default function AdvanceTab() {
  const { attributes } = useAttribute();
  const {
    setValue,
    deleteAttributes,
    toggleVariantAttribute,
    setImageBased,
    values,
  } = useProductAttributes();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.2fr_2fr] gap-5 mt-5">
      <div className="flex flex-col gap-5">
        <div className="bg-black/5 dark:bg-white/5 rounded-2xl w-full p-3">
          <h1 className="opacity-50">Attributes</h1>
          <div className="text-sm">
            {attributes.map((attribute) => {
              const isChecked = values.variantAttributeIds.includes(
                attribute.id,
              );

              const selectedAttr = values.productAttributes?.find(
                (a: IProductAttribute) => a.attributeId === attribute.id,
              );

              const hasValues =
                selectedAttr?.values && selectedAttr.values.length > 0;

              return (
                <div key={attribute.id}>
                  <SelectForm
                    name={`attribute-${attribute.id}`}
                    label={attribute.name}
                    isMutipleSelect={true}
                    isAttribute={true}
                    value={selectedAttr?.values || []}
                    options={attribute.attributeValues.map((o) => ({
                      id: o.id,
                      name: o.value,
                    }))}
                    onSelect={(value: number[]) => {
                      setValue(attribute.id, value);
                    }}
                    onDelete={() => deleteAttributes(attribute.id)}
                  />
                  {values.type === 'VARIANT' && hasValues && (
                    <div className="flex items-center -mt-2 flex-wrap space-y-1">
                      <label className="flex items-center gap-1 cursor-pointer ml-3">
                        <input
                          type="checkbox"
                          name="variantAttributeIds"
                          checked={isChecked}
                          onChange={() => toggleVariantAttribute(attribute.id)}
                          className="peer hidden"
                        />

                        <CheckBox isChecked={isChecked} />

                        <span className="text-xs">
                          Use for variants attribute
                        </span>
                      </label>
                      {isChecked && (
                        <label className="flex items-center gap-1 cursor-pointer ml-3">
                          <input
                            type="checkbox"
                            checked={!!selectedAttr?.imageBased}
                            onChange={(e) =>
                              setImageBased(attribute.id, e.target.checked)
                            }
                            className="peer hidden"
                          />
                          <CheckBox isChecked={!!selectedAttr?.imageBased} />
                          <span className="text-xs">Use as variants image</span>
                        </label>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="-mt-3">
            <ErrorForm name="productAttributes" />
            {values.type === 'VARIANT' && (
              <ErrorForm name="variantAttributeIds" />
            )}
          </div>
        </div>

        <div className="bg-black/5 dark:bg-white/5 rounded-2xl w-full p-3 h-full">
          <h1 className="opacity-50">Pricing and Stock</h1>
          <div className="text-sm">
            <NumberFieldForm name="basePrice" label="Price" />
            <NumberFieldForm name="baseStock" label="Stock" />
          </div>
        </div>
      </div>
      <div>
        <div className="bg-black/5 dark:bg-white/5 rounded-2xl w-full p-3 h-full">
          <h1 className="opacity-50">Details Product</h1>
          <div className="text-sm">
            <div className="flex gap-x-1 lg:gap-x-3">
              {values.type === 'NO_VARIANT' && (
                <div className="grow flex-1/2">
                  <TextFieldForm name="barcode" label="Barcode" />
                </div>
              )}
              <SelectForm
                name={'sizingGuideId'}
                label={'Sizing Guide'}
                options={[{ id: 1, name: 'No Sizing Guide' }]}
              />
            </div>
            <TextAreaFieldForm name="productDetails.feature" label="Feature" />
            <TextAreaFieldForm
              name="productDetails.material"
              label="Material"
            />
            <TextAreaFieldForm name="productDetails.care" label="Care" />
          </div>
        </div>
      </div>
    </div>
  );
}
