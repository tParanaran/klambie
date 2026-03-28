'use client';

import useAttribute from '../../c/hooks/useAttribute';
import { useState } from 'react';
import { antonFont } from '@/utils/fonts';
import { useRouter } from 'next/navigation';
import { IoArrowForward } from 'react-icons/io5';
import { BiCategory } from 'react-icons/bi';
import TagButton from '@/views/components/tagButton';
import Image from 'next/image';
import HorizontalScrollButton from './buttonScroll';
import TitileContainer from '@/views/components/titleContainer';
import { hoverEffect } from '@/utils/styling';

interface IShopByCategory {
  slug: string;
}

export default function ShopByCategory({ slug }: IShopByCategory) {
  const router = useRouter();
  const { categories } = useAttribute();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const category = categories.filter((cat) => cat.slug === slug)[0];

  const segments = category.subcategories?.slice().reverse() || [];

  return (
    <main>
      <div className="my-10">
        <TitileContainer
          badge={'Our Collections'}
          title={'Elevate Your Style With Our'}
          spanTitle={`${category.name} Collections`}
        />
      </div>
      <HorizontalScrollButton>
        <div className="flex sm:grid sm:grid-cols-3 md:grid-cols-5">
          {segments.map((cat, c) => (
            <div
              key={cat.slug}
              className={`relative flex-none cursor-pointer overflow-hidden mx-1.5 my-2 w-50 h-50 sm:w-auto ${c === 1 || c === 3 ? 'md:row-span-2 md:h-72 lg:h-80 md:mt-auto' : c === 5 || c === 6 ? 'sm:h-32! md:h-28 lg:h-32' : 'md:h-48 lg:h-56'} ${c === 2 ? 'md:row-span-2 md:mt-auto md:h-56 lg:h-64' : ''} ${c === 1 ? 'sm:row-span-2! sm:mt-auto sm:h-88' : ''} ${c === 5 ? 'sm:col-span-2 md:col-span-1 sm:mx-3 md:mx-1.5' : ''} ${hoverEffect}`}
            >
              <div className="absolute inset-0 bg-primary rounded-2xl -z-10" />
              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                <Image
                  height={224}
                  width={224}
                  src={
                    `/images/${category.slug}/${cat.slug}.jpg` ||
                    '/images/hat.jpg'
                  }
                  alt={cat.name}
                  className="object-cover w-full h-full transition-transform duration-300"
                />

                <div
                  className={`absolute top-0 w-full bg-linear-to-t dark:bg-linear-to-b from-black/70 to-50% h-full p-2 ${
                    activeIndex === c ? 'opacity-0' : 'opacity-100'
                  }`}
                >
                  <h1
                    className={`${antonFont.className} font-semibold text-lg uppercase text-dark`}
                  >
                    {cat.name}
                  </h1>
                </div>
              </div>
              <div className="absolute z-10 bg-bl bottom-0 left-0 w-9 h-9 bg-body rounded-tr-2xl rounded-bl-2xl inverted-radius-bl"></div>

              <button
                className={`absolute bottom-0 left-0 z-10 
                  rounded-full bg-round-button p-1 text-2xl
                   shadow-lg
                  transition-all duration-300
                   ${activeIndex === c ? 'rotate-135' : '-rotate-45'}`}
                aria-label="See more"
                onClick={
                  cat.subcategories?.length === 0
                    ? () => router.push(`/c/${category.slug}/${cat.slug}`)
                    : () => setActiveIndex(activeIndex === c ? null : c)
                }
              >
                <IoArrowForward />
              </button>

              {cat.subcategories && cat.subcategories.length > 0 && (
                <div
                  className={`absolute inset-0 rounded-2xl bg-secondary-opacity backdrop-blur-xs p-1.5 flex flex-col justify-start transition-all duration-300 ${activeIndex === c ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-5 pointer-events-none'}`}
                >
                  <p className="mb-3 opacity-50 text-sm md:text-base">
                    {cat.name}
                  </p>

                  <div className="overflow-y-auto scrollbar-hide">
                    <div className="text-sm flex flex-wrap space-x-1">
                      <TagButton
                        className="hover:bg-orange-700 flex-none"
                        icon={<BiCategory className="text-lg" />}
                        href={`/c/${category.slug}/${cat.slug}`}
                      >
                        Shop All
                      </TagButton>
                      {cat.subcategories.map((subCat) => (
                        <TagButton
                          className="hover:bg-orange-700 flex-none"
                          icon={<BiCategory className="text-lg" />}
                          key={subCat.slug}
                          href={`/c/${category.slug}/${cat.slug}/${subCat.slug}`}
                        >
                          {subCat.name}
                        </TagButton>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </HorizontalScrollButton>
    </main>
  );
}
