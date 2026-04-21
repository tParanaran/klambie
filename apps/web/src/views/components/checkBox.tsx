import { IoCheckmark } from 'react-icons/io5';

export default function CheckBox({ isChecked }: { isChecked: boolean }) {
  return (
    <div
      className={`w-4 h-4 rounded-full border flex items-center justify-center transition hover:ring hover:ring-black/90 hover:ring-offset-1 hover:ring-offset-slate-100 cursor-pointer ${isChecked ? 'bg-orange-800 border-orange-800 ring-1 ring-orange-800 ring-offset-1 ring-offset-slate-100' : 'border-gray-400'}`}
    >
      {isChecked && <IoCheckmark className="text-light text-sm" />}
    </div>
  );
}
