import { antonFont } from '@/utils/fonts';
import Link from 'next/link';

export default function HeroText() {
  return (
    <div className="lg:p-9 h-full mt-3 lg:mt-0">
      <div>
        <h1
          className={`uppercase text-6xl sm:text-7xl/20 tracking-tight ${antonFont.className}`}
        >
          Real Designs
          <br /> By Real Artists <br />
          For Real People
        </h1>
      </div>
      <div className="mt-7">
        <p className="text-justify">
          KLAMBIE makes clothes to elevate everyday life through lighthearted
          escapism. We're challenging conventional retail, putting an end to
          dead stock, uncoventional waste and more funtastic. While styles vary
          by season,{' '}
          <Link href="/shop" className="text-orange-700 hover:text-orange-600">
            all collections
          </Link>{' '}
          are guided by the ineffable sense of freedom that comes with travel.
        </p>
      </div>
    </div>
  );
}
