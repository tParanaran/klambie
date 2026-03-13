import { useRouter } from 'next/navigation';
import { IoChevronBackOutline, IoShareSocial } from 'react-icons/io5';
import ShareButton from './shareButton';

export default function NavbarProduct({ brand }: { brand: string }) {
  const router = useRouter();

  return (
    <nav
      className="
        sticky top-0 left-0 right-0 py-4 flex justify-between z-20 bg-inherit md:hidden"
    >
      <button onClick={() => router.back()} aria-label="Go back">
        <IoChevronBackOutline className="text-2xl hover:scale-125" />
      </button>
      <h1 className="font-semibold text-lg">{brand}</h1>
      <ShareButton />
    </nav>
  );
}
