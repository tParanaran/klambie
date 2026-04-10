import { IconType } from 'react-icons';
import { IoChevronDown } from 'react-icons/io5';
import { LuChevronsUpDown } from 'react-icons/lu';
import { TbStatusChange } from 'react-icons/tb';

interface IToggleButton {
  setToggle: () => void;
  Icon: IconType;
  isToggle: boolean;
  label: string;
  style?: string;
  isRotate?: boolean;
}

export default function ToggleButton({
  setToggle,
  Icon,
  isToggle,
  label,
  style,
  isRotate,
}: IToggleButton) {
  const IconComponent =
    Icon !== IoChevronDown || isToggle ? Icon : LuChevronsUpDown;

  return (
    <button
      onClick={setToggle}
      className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm transition-all duration-200 ${
        isToggle
          ? `bg-white shadow text-black ${style}`
          : 'opacity-50 hover:text-orange-700'
      } ${Icon === TbStatusChange ? 'w-23' : ''}`}
    >
      <IconComponent
        size={16}
        className={`transform transition-transform duration-300 ${
          isRotate ? 'rotate-180' : 'rotate-0'
        }`}
      />

      {label}
    </button>
  );
}
