import { createValueMap } from '@/utils/generateProductVariants';
import NumberFieldForm from '@/views/components/formik/numberFieldForm';
import TextFieldForm from '@/views/components/formik/textFieldForm';

interface IProps {
  index: number;
  attributeValueId: number[];
}

export default function VariantForm({ index, attributeValueId }: IProps) {
  const valueMap = createValueMap();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-[100px_1fr] gap-x-3 items-center text-sm">
      <span className="opacity-50 text-base">
        {attributeValueId.map((id) => valueMap[id] || id).join(' / ')}
      </span>{' '}
      <div className="grid grid-cols-2 sm:grid-cols-3! gap-x-1 sm:gap-x-3">
        <div className="col-span-2 sm:col-span-1">
          <TextFieldForm
            name={`productVariants.${index}.barcode`}
            label="Barcode"
          />
        </div>
        <NumberFieldForm
          name={`productVariants.${index}.basePrice`}
          label="Price"
        />
        <NumberFieldForm
          name={`productVariants.${index}.stock`}
          label="Stock"
        />
      </div>
    </div>
  );
}
