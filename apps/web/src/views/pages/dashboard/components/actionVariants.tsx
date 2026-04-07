import { TbHttpDelete, TbHttpPatch } from 'react-icons/tb';

interface IActionVariants {
  onDelete: () => void;
  onEdit: () => void;
}

export default function ActionVariants({ onDelete, onEdit }: IActionVariants) {
  return (
    <div className="flex sm:space-x-1 text-light flex-col sm:flex-row">
      <button
        className="bg-red-800 rounded-full p-1.5 my-0.5"
        onClick={() => onDelete()}
        aria-label="Delete variants"
      >
        <TbHttpDelete className="text-xl" />
      </button>
      <button
        className="bg-green-700 rounded-full p-1.5 my-0.5"
        onClick={() => onEdit()}
        aria-label="Edit variants"
      >
        <TbHttpPatch className="text-xl" />
      </button>
    </div>
  );
}
