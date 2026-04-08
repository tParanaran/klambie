import { IoCaretDown } from 'react-icons/io5';

interface IVariantsButton {
  attribute: string;
  isDisabled?: boolean;
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
  isDisabled = false,
  onClick,
}: IVariantsButton) {
  return (
    <button
      className="py-2 px-4 rounded-full w-fit items-center bg-black/10 dark:bg-white/10 h-fit my-1 cursor-pointer disabled:cursor-not-allowed"
      aria-label="Product variants"
      disabled={isDisabled}
      onClick={() => onClick(slug, name, quantity)}
    >
      <div className="flex items-center">
        {attribute} <IoCaretDown className="text-sm ml-1" />
      </div>
    </button>
  );
}
