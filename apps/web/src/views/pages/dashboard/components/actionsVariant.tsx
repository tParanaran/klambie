import { TbHttpDelete, TbHttpPatch } from 'react-icons/tb';

export default function ActionsVariant() {
  return (
    <div className="flex sm:space-x-1 text-light flex-col sm:flex-row">
      <button className="bg-red-800 rounded-full p-1.5 my-0.5">
        <TbHttpDelete className="text-xl" />
      </button>
      <button className="bg-green-700 rounded-full p-1.5 my-0.5">
        <TbHttpPatch className="text-xl" />
      </button>
    </div>
  );
}
