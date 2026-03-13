import { IoChevronBackOutline } from 'react-icons/io5';
import { useRouter } from 'next/navigation';

export default function GoBackButton() {
  const router = useRouter();
  return (
    <button onClick={() => router.back()} aria-label="Go back">
      <IoChevronBackOutline className="text-2xl hover:scale-125" />
    </button>
  );
}
