'use client';
import TitileContainer from '@/views/components/titleContainer';
import useAttribute from '../../c/hooks/useAttribute';
import Image from 'next/image';
import useDetectIsMobile from '../../template/hooks/useDetectIsMobile';
import Link from 'next/link';
import { IoArrowForward } from 'react-icons/io5';
import { antonFont } from '@/utils/fonts';
import { hoverEffect } from '@/utils/styling';

export default function CategoryHome() {
  const { categories } = useAttribute();
  const { isMobile } = useDetectIsMobile({ widthScreen: 450 });
  return (
    <div className="mb-5">
      {' '}
      <div className="mb-10 mt-5 lg:my-15">
        <TitileContainer
          badge={'Our Collections'}
          title={'Level Up Your Style With'}
          spanTitle="Our Real Collections"
        />
        <Link
          href={'/c'}
          className="flex w-44 justify-between bg-primary rounded-full pl-3 py-1 items-center uppercase mt-3 relative mx-auto"
        >
          <h1 className="flex-none text-sm text-orange-700">Shop All</h1>
          <span className="text-2xl p-1 rounded-full flex-none mx-1 text-light bg-round-button">
            <IoArrowForward />
          </span>
        </Link>
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
            <div className="absolute z-10 top-0 right-0 w-9 h-9 bg-body rounded-tr-2xl rounded-bl-2xl inverted-radius-tr"></div>

            <div className="absolute top-0 right-0 z-10 rounded-2xl bg-round-button p-1 text-2xl">
              <IoArrowForward className="-rotate-35" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
