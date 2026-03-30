'use client';

import TitileContainer from '@/views/components/titleContainer';
import useAttribute from '../../c/hooks/useAttribute';
import Link from 'next/link';
import Image from 'next/image';
import { hoverEffect } from '@/utils/styling';
import SeeMoreButton from './seeMore';
import ArrowForwarButton from './arrowForward';
import HorizontalScrollButton from '../../d/components/buttonScroll';

export default function BrandSection() {
  const { brands } = useAttribute();

  const brandsPriority = brands.filter((brand) => brand.priority === true);
  return (
    <div>
      <div className="my-10 lg:my-15">
        <TitileContainer
          badge={'Our Collections'}
          title={'Brands That Got'}
          spanTitle={`You Looking`}
          isFull={true}
        />
        <SeeMoreButton href={'/brands'} name={'See More'} />
      </div>

      <HorizontalScrollButton>
        <div className="grid grid-rows-2 grid-cols-[repeat(5,208px)] sm:grid-cols-[repeat(5,240px)] lg:grid-cols-5 gap-3 p-1.5">
          {brandsPriority.map((brand) => (
            <div
              key={brand.slug}
              className={`bg-primary rounded-2xl p-3 overflow-hidden ${hoverEffect}`}
            >
              <Image
                src={`/images/brand/${brand.slug}.svg`}
                width={50}
                height={50}
                alt={brand.name}
                className="w-full object-contain px-5 h-10 sm:h-12"
              />
              <div className="mt-2">
                <h1 className="text-base text-active mb-1">{brand.name}</h1>
                <p className="text-sm opacity-50">{brand.description}</p>
              </div>
              <Link href={`/c?brand=${brand.slug}`}>
                <ArrowForwarButton />
              </Link>{' '}
            </div>
          ))}
        </div>
      </HorizontalScrollButton>
    </div>
  );
}
