import Link from 'next/link';
import { IoArrowDown, IoMailOutline } from 'react-icons/io5';

export default function ContactLink() {
  return (
    <div className="absolute flex flex-col-reverse sm:flex-row bottom-2 left-2 right-2  sm:bottom-5 sm:left-5 sm:right-5 gap-2 w-auto z-2">
      <Link
        href={'/register'}
        className="bg-white w-full py-1 rounded-full text-black flex justify-between items-center overflow-hidden text-sm sm:flex-row-reverse"
      >
        <span
          className="rounded-full bg-black text-[#ededed] p-2 mx-1 text-2xl"
          aria-label="Register"
        >
          <IoArrowDown />
        </span>
        <h1 className="uppercase mr-5 sm:ml-5">Get Started</h1>
      </Link>

      <Link
        href={'/contact'}
        className="border w-full py-1 rounded-full text-[#ededed] flex justify-between items-center overflow-hidden text-sm sm:flex-row-reverse"
      >
        <span
          className="rounded-full bg-white text-black p-2 mx-1 text-2xl"
          aria-label="Contact us"
        >
          <IoMailOutline />
        </span>
        <h1 className="uppercase mr-5 sm:ml-5">Contact Us</h1>
      </Link>
    </div>
  );
}
