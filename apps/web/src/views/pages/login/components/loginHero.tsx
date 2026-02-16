import { antonFont } from '@/utils/fonts';
import Image from 'next/image';
import ContactLink from '../../home/components/contactLink';
import LoginHeader from './loginHeader';

export default function LoginHero() {
  return (
    <div className="relative bg-black rounded-2xl h-80 sm:h-72 md:h-full">
      <Image
        src={'/login-img.jpg'}
        alt={'Login image'}
        width={200}
        height={200}
        className="object-cover h-full w-full rounded-2xl"
        loading="lazy"
      />
      <div className="absolute h-full w-full bg-linear-to-b from-black to-transparent top-0 left-0 rounded-2xl backdrop-blur-xs"></div>
      <div className="absolute text-[#ededed] top-2 right-2 left-2 sm:top-5 sm:left-5 sm:right-5 lg:top-10 lg:left-10 overflow-hidden">
        <div className="block md:hidden">
          <LoginHeader />
        </div>
        <h1
          className={`uppercase text-5xl sm:text-7xl tracking-tight ${antonFont.className} hidden md:block`}
        >
          Real Designs
          <br /> By Real Artists <br />
          For Real People
        </h1>
      </div>
      <ContactLink />
    </div>
  );
}
