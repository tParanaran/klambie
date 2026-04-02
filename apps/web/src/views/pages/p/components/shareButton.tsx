import { IoShareSocial } from 'react-icons/io5';

export default function ShareButton() {
  return (
    <button aria-label="Go share">
      <IoShareSocial className="text-2xl hover:scale-125" />
    </button>
  );
}
