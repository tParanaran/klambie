import { IconType } from 'react-icons';

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
  return (
    <button
      onClick={setToggle}
      className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm transition-all duration-200 ${
        isToggle
          ? `bg-white shadow text-black ${style}`
          : 'opacity-50 hover:text-orange-700'
      }`}
    >
      <Icon
        size={16}
        className={`transform transition-transform duration-300 ${
          isRotate ? 'rotate-0' : 'rotate-180'
        }`}
      />
      {label}
    </button>
  );
}
