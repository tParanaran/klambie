import NumberFieldForm from '@/views/components/formik/numberFieldForm';
import TextAreaFieldForm from '@/views/components/formik/textAreaFieldForm';
import useAttribute from '@/views/pages/c/hooks/useAttribute';
import SelectForm from '@/views/components/formik/selectForm';
import ErrorForm from '@/views/components/formik/errorForm';
import { useProductAttributes } from '../hooks/useProductAttributes';

interface IAdvanceTab {
  onOpen: () => void;
  isReady: boolean;
}

export default function AdvanceTab({ onOpen, isReady }: IAdvanceTab) {
  const { attributes } = useAttribute();
  const { setValue, values } = useProductAttributes();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.2fr_2fr] gap-5 mt-5">
      <div className="flex flex-col gap-5">
        <div className="bg-black/5 dark:bg-white/5 rounded-2xl w-full p-3">
          <h1 className="opacity-50">Attributes</h1>
          <div className="grid grid-cols-2 gap-x-1 sm:gap-x-3 text-sm">
            {attributes.map((attribute) => (
              <SelectForm
                key={attribute.slug}
                name={`attribute-${attribute.id}`}
                label={attribute.name}
                options={attribute.attributeValues.map((o) => ({
                  id: o.id,
                  name: o.value,
                }))}
                onSelect={(value: number | null) => {
                  setValue(attribute.id, value);
                }}
              />
            ))}

            <div className="-mt-3.5">
              <ErrorForm name="productAttributes" />
            </div>
          </div>
        </div>
        <div className="bg-black/5 dark:bg-white/5 rounded-2xl w-full p-3 h-full">
          <h1 className="opacity-50">Pricing and Stock</h1>
          <div className="text-sm">
            <NumberFieldForm name="basePrice" label="Price" />
            <NumberFieldForm name="baseStock" label="Stock" />
            <NumberFieldForm name="comparePrice" label="Compare Price" />
            {values.type === 'VARIANT' && (
              <div>
                <label className="ml-4">Product Variants</label>
                <button
                  type="button"
                  onClick={onOpen}
                  disabled={!isReady}
                  className="rounded-full text-sm px-4 h-10 text-left bg-black/10 dark:bg-white/10 w-full"
                  aria-label="Create product variants"
                >
                  <p className="text-xs opacity-50">
                    {isReady
                      ? 'Click here to create product variants'
                      : 'Please fill price and stock first to create variants'}
                  </p>
                </button>
                <ErrorForm name="productVariants" />
              </div>
            )}
          </div>
        </div>
      </div>
      <div>
        <div className="bg-black/5 dark:bg-white/5 rounded-2xl w-full p-3 h-full">
          <h1 className="opacity-50">Details Product</h1>
          <div className="text-sm">
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
