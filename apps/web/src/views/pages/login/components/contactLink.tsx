import Link from 'next/link';
import { IoArrowDown, IoMailOutline } from 'react-icons/io5';

const div =
  'absolute flex flex-col-reverse sm:flex-row bottom-2 left-2 right-2  sm:bottom-5 sm:left-5 sm:right-5 gap-2 w-auto z-auto';
const link =
  'w-full py-1 rounded-full text-light flex justify-between items-center overflow-hidden text-sm sm:flex-row-reverse';
const span = 'rounded-full p-2 mx-1 text-2xl';
const h1 = 'uppercase mr-5 sm:ml-5';

export default function ContactLink() {
  return (
    <div className={div}>
      <Link href={'/register'} className={`bg-light text-fixed ${link}`}>
        <span className={`text-light bg-dark ${span}`} aria-label="Register">
          <IoArrowDown />
        </span>
        <h1 className={h1}>Get Started</h1>
      </Link>

      <Link href={'/contact'} className={`border ${link}`}>
        <span className={`text-fixed bg-light ${span}`} aria-label="Contact us">
          <IoMailOutline />
        </span>
        <h1 className={h1}>Contact Us</h1>
      </Link>
    </div>
  );
}
