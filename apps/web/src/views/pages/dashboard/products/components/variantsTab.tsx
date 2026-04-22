import { useFormikContext } from 'formik';
import { IProductFormValues } from '../types';
import { createValueMap, groupByImage } from '@/utils/generateProductVariants';
import ImageUploader from './imageUploader';
import VariantForm from './variantForm';

export default function VariantsTab() {
  const { values } = useFormikContext<IProductFormValues>();
  const valueMap = createValueMap();
  const variants = values.productVariants || [];
  const grouped = groupByImage(variants, values);

  if (grouped) {
    return (
      <div className="flex flex-col gap-5 my-5">
        {Object.entries(grouped).map(([imageValueId, list]) => {
          return (
            <div
              key={imageValueId}
              className="grid grid-cols-1 lg:grid-cols-[0.5fr_2fr] gap-x-5 bg-black/5 dark:bg-white/5 rounded-2xl w-full p-2"
            >
              <div>
                <h1 className="opacity-50">
                  {valueMap[Number(imageValueId)] + ' Variants' ||
                    `Group ${imageValueId}`}
                </h1>

                <div className="text-center lg:text-left">
                  <h1 className="text-sm -mb-1.5 mt-1.5 ml-3">Variant Image</h1>
                  <ImageUploader
                    key={imageValueId}
                    attributeValueId={Number(imageValueId)}
                    isSinglePhoto={true}
                  />
                </div>
              </div>

              <div>
                {list.map((variant, index) => {
                  const realIndex = variants.findIndex(
                    (v) =>
                      JSON.stringify([...v.attributeValueId].sort()) ===
                      JSON.stringify([...variant.attributeValueId].sort()),
                  );

                  return (
                    <VariantForm
                      key={index}
                      index={realIndex}
                      attributeValueId={variant.attributeValueId}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-2">
      {variants.map((variant, index) => (
        <div
          key={index}
          className="bg-black/5 dark:bg-white/5 rounded-2xl w-full p-2"
        >
          <VariantForm
            index={index}
            attributeValueId={variant.attributeValueId}
          />
        </div>
      ))}
    </div>
  );
}
