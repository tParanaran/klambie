import { antonFont } from '@/utils/fonts';
import styles from '@/app/page.module.css';
import RegisterSwiper from './registerSwiper';

export default function RegisterHero() {
  return (
    <div className="mt-[25%] pr-5">
      <div className="relative">
        <h1
          className={`uppercase text-5xl sm:text-7xl tracking-tight ${antonFont.className} hidden md:block`}
        >
          We Are Changing <br /> The Way Things <br /> Get Made.
        </h1>
      </div>{' '}
      <div className="py-10">
        <RegisterSwiper />
      </div>{' '}
    </div>
  );
}
