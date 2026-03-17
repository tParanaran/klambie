import { IProductDetails } from '../types/product.types';
import Dropdown from './dropdown';

interface IDetails {
  details: IProductDetails;
  sku: string;
}

export default function Details({ details, sku }: IDetails) {
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
            <p>SKU : {sku}</p>
            <p>Weight: {weight} gram</p>
            {volume ? <p>Volume: {volume} liter</p> : null}
            {height ? <p>Heigth: {height} cm</p> : null}
            {width ? <p>Width: {width} cm</p> : null}
            {length ? <p>Length: {length} cm</p> : null}
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
