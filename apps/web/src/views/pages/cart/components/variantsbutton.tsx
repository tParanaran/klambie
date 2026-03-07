import { IoCaretDown } from 'react-icons/io5';
import useQuantity from '../hooks/useQuantity';

interface IVariantsButton {
  attribute: string;
  slug: string;
  name: string;
  quantity: number;
  onClick: (slug: string, name: string, quantity: number) => void;
}
export default function VariantsButton({
  attribute,
  slug,
  name,
  quantity,
  onClick,
}: IVariantsButton) {
  return (
    <button
      className="py-2 px-4 rounded-full w-fit items-center bg-black/10 h-fit my-1"
      aria-label="Product variants"
      onClick={() => onClick(slug, name, quantity)}
    >
      <div className="flex items-center">
        {attribute} <IoCaretDown className="text-sm ml-1" />
      </div>
    </button>
  );
}
