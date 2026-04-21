import { useFormikContext } from 'formik';
import { IProductFormValues, IProductVariant } from '../types';
import { createValueMap, groupByImage } from '@/utils/generateProductVariants';
import useAttribute from '@/views/pages/c/hooks/useAttribute';
import ImageUploader from './imageUploader';
import NumberFieldForm from '@/views/components/formik/numberFieldForm';
import TextFieldForm from '@/views/components/formik/textFieldForm';

export default function VariantsTab() {
  const { values, setFieldValue } = useFormikContext<IProductFormValues>();
  const { attributes } = useAttribute();

  const variants = values.productVariants || [];
  const grouped = groupByImage(variants, values);
  const valueMap = createValueMap(attributes);

  if (grouped) {
    return (
      <div className="flex flex-col gap-5 my-5">
        {Object.entries(grouped).map(([imageValueId, list]) => {
          return (
            <div
              key={imageValueId}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_2fr] gap-5 bg-black/5 dark:bg-white/5 rounded-2xl w-full p-2"
            >
              <div>
                <ImageUploader
                  attributeValueId={Number(imageValueId)}
                  isSinglePhoto={true}
                />
              </div>

              <div>
                <h1 className="opacity-50">
                  {valueMap[Number(imageValueId)] + ' Variants' ||
                    `Group ${imageValueId}`}
                </h1>
                <div className="grid grid-cols-5 gap-1 text-sm items-center mt-2 -mb-2">
                  <div></div>
                  <h1 className="ml-3">Barcode</h1>
                  <h1 className="ml-3">Price</h1>
                  <h1 className="ml-3">Compare Price</h1>
                  <h1 className="ml-3">Stock</h1>
                </div>

                {list.map((variant, index) => {
                  const realIndex = variants.findIndex(
                    (v) =>
                      JSON.stringify([...v.attributeValueId].sort()) ===
                      JSON.stringify([...variant.attributeValueId].sort()),
                  );

                  return (
                    <div
                      key={index}
                      className="grid grid-cols-5 gap-1 text-sm items-center"
                    >
                      <span>
                        {variant.attributeValueId
                          .map((id) => valueMap[id] || id)
                          .join(' / ')}
                      </span>
                      <TextFieldForm
                        name={`productVariants.${realIndex}.barcode`}
                        placeholder="Barcode"
                      />
                      <NumberFieldForm
                        name={`productVariants.${realIndex}.basePrice`}
                        placeholder="Price"
                      />

                      <NumberFieldForm
                        name={`productVariants.${realIndex}.comparePrice`}
                        placeholder="Compare Price"
                      />
                      <NumberFieldForm
                        name={`productVariants.${realIndex}.stock`}
                        placeholder="Stock"
                      />
                    </div>
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
    <div className="flex flex-col gap-2">
      {variants.map((variant, index) => (
        <div key={index} className="grid grid-cols-4 gap-2">
          <span className="text-xs">
            {variant.attributeValueId
              .map((id) => valueMap[id] || id)
              .join(' / ')}
          </span>

          <input
            type="number"
            value={variant.basePrice || ''}
            onChange={(e) => {
              const updated = [...variants];
              updated[index].basePrice = Number(e.target.value);
              setFieldValue('productVariants', updated);
            }}
          />

          <input
            type="number"
            value={variant.stock || ''}
            onChange={(e) => {
              const updated = [...variants];
              updated[index].stock = Number(e.target.value);
              setFieldValue('productVariants', updated);
            }}
          />

          <input
            type="text"
            value={variant.barcode || ''}
            onChange={(e) => {
              const updated = [...variants];
              updated[index].barcode = e.target.value;
              setFieldValue('productVariants', updated);
            }}
          />
        </div>
      ))}
    </div>
  );
}
