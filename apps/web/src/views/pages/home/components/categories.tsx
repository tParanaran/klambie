'use client';
import { antonFont } from '@/utils/fonts';
import { hoverEffect } from '@/utils/styling';
import SeeMoreButton from './seeMore';
import ArrowForwarButton from './arrowForward';
import TitileContainer from '@/views/components/titleContainer';
import useAttribute from '../../c/hooks/useAttribute';
import Image from 'next/image';
import useDetectIsMobile from '../../template/hooks/useDetectIsMobile';
import Link from 'next/link';

export default function CategoryHome() {
  const { categories } = useAttribute();
  const { isMobile } = useDetectIsMobile({ widthScreen: 450 });
  return (
    <div className="my-10 lg:my-15">
      <div className="mb-10 lg:mb-15">
        <TitileContainer
          badge={'Our Collections'}
          title={'Level Up Your Style With'}
          spanTitle="Our Real Collections"
        />
        <SeeMoreButton href={'/c'} name={'Shop All'} style="mx-auto" />
      </div>
      <div
        className={`grid gap-2.5 lg:gap-3 items-end md:items-center ${isMobile ? 'grid-cols-2' : 'grid-cols-3 md:grid-cols-5'}`}
      >
        {categories.map((category, c) => (
          <Link
            href={`/d/${category.slug}`}
            key={category.slug}
            className={`relative rounded-2xl overflow-hidden w-auto ${hoverEffect} ${c === 0 || c === 4 ? 'ms:h-56' : c === 2 ? 'md:h-96' : 'md:h-72'} ${c === 1 ? 'row-span-2 h-full' : 'h-40 sm:h-52'}`}
          >
            <div className="h-full w-full">
              <Image
                src={`/images/home/${category.slug}.jpg`}
                height={225}
                width={225}
                alt={category.name}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="absolute top-0 w-full bg-linear-to-t dark:bg-linear-to-b from-black/70 to-50% h-full p-2">
              <h1
                className={`${antonFont.className} font-semibold text-lg uppercase text-dark`}
              >
                {category.name}
              </h1>
            </div>

            <ArrowForwarButton />
          </Link>
        ))}
      </div>
    </div>
  );
}
