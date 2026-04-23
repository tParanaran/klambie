import { IAttributes, IProductDetails } from '../types/product.types';
import Dropdown from './dropdown';

interface IDetails {
  details: IProductDetails;
  selectedAttributes: Record<number, number>;
  attributes: IAttributes[];
  sku: string;
}

export default function Details({
  details,
  attributes,
  sku,
  selectedAttributes,
}: IDetails) {
  const {
    material,
    care,
    description,
    feature,
    volume,
    weight,
    width,
    length,
    height,
  } = details;

  return (
    <div>
      <div className="mb-4">
        <h1 className="font-semibold text-lg mb-5">Product Information</h1>
        <div className="text-sm leading-6">
          <h1 className="text-base mb-2 font-semibold">Details</h1>
          <div className="font-light">
            <div className="flex space-y-0.5">
              <span className="w-24 shrink-0">SKU</span>
              <span>: {sku}</span>
            </div>

            <div className="flex">
              <span className="w-24 shrink-0">Weight</span>
              <span>: {weight} gram</span>
            </div>

            {volume && (
              <div className="flex">
                <span className="w-24 shrink-0">Volume</span>
                <span>: {volume} liter</span>
              </div>
            )}

            {height && (
              <div className="flex">
                <span className="w-24 shrink-0">Height</span>
                <span>: {height} cm</span>
              </div>
            )}

            {width && (
              <div className="flex">
                <span className="w-24 shrink-0">Width</span>
                <span>: {width} cm</span>
              </div>
            )}

            {length && (
              <div className="flex">
                <span className="w-24 shrink-0">Length</span>
                <span>: {length} cm</span>
              </div>
            )}

            {attributes?.map((attribute) => {
              const selectedValueId = selectedAttributes[attribute.id];

              const selectedValue = attribute.values.find(
                (val) => val.id === selectedValueId,
              );

              return (
                <div key={attribute.id} className="flex">
                  <span className="w-24 shrink-0">{attribute.name}</span>
                  <span>
                    :{' '}
                    {selectedValue
                      ? selectedValue.name
                      : attribute.values.map((val) => val.name).join(', ')}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Dropdown body={description} header="About the Product" />
      {material ? <Dropdown body={material} header="Material" /> : null}
      {care ? <Dropdown body={care} header="Care Label" /> : null}
      {feature ? (
        <div className="border-b-[0.5px] border-gray-300 dark:border-[#1A1A1A] mb-10">
          <Dropdown body={feature} header="Feature and Benefit" />
        </div>
      ) : null}
    </div>
  );
}
