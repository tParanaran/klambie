import Image from 'next/image';
import Link from 'next/link';
import { IoMailOutline } from 'react-icons/io5';

export default function HeroMain() {
  return (
    <div className="relative rounded-2xl overflow-hidden min-h-175 h-[85vh] max-h-189 shadow-xs">
      <div className="h-full w-full">
        <Image
          src={'/images/home/header-img.jpg'}
          className="object-cover h-full w-full"
          width={300}
          height={400}
          alt="Hero Picture"
          loading="lazy"
          aria-placeholder="blur"
        />
      </div>

      <div className="absolute top-0 w-full h-full bg-linear-to-t dark:bg-linear-to-b from-black/90 to-transparent backdrop-blur-xs"></div>

      <div className="absolute z-10 top-0 right-0 w-42 h-12 bg-[rgb(var(--background-start-rgb))]! rounded-tr-2xl rounded-bl-2xl inverted-radius-tr">
        <Link
          href={'/contact'}
          className="py-1 rounded-2xl flex justify-between w-41 items-center overflow-hidden text-xs md:text-sm ml-1 mb-1 bg-[#ededed] dark:bg-[#1A1A1A] dark:text-orange-700"
        >
          <span
            className="rounded-full bg-black text-[#ededed] dark:text-orange-700 p-1.5 text-2xl ml-1"
            aria-label="Contact us"
          >
            <IoMailOutline className="hover:scale-110" />
          </span>
          <h1 className="uppercase ml-auto mr-3">Contact Us</h1>
        </Link>
      </div>
    </div>
  );
}
