'use client';

import useAttribute from '../../c/hooks/useAttribute';
import { useState } from 'react';
import { antonFont } from '@/utils/fonts';
import { useRouter } from 'next/navigation';
import { IoArrowForward, IoClose } from 'react-icons/io5';
import { BiCategory } from 'react-icons/bi';
import TagButton from '@/views/components/tagButton';
import Image from 'next/image';
import LinkButton from '@/views/components/link';
import HorizontalScrollButton from './buttonScroll';

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
      <div className="w-10/12 md:w-8/12 text-center mx-auto">
        <h1 className="font-bold text-2xl sm:text-4xl lg:text-5xl md:leading-12 mt-5 mb-5 md:mb-3">
          Elevate Your Style With Our {category.name} Collections
        </h1>
      </div>
      <HorizontalScrollButton>
        <div className="flex sm:grid sm:grid-cols-3 md:grid-cols-5 gap-2 lg:gap-3">
          {segments.map((cat, c) => (
            <div
              key={cat.slug}
              className={`relative rounded-2xl flex-none cursor-pointer w-50 h-50 sm:w-auto ${c === 1 || c === 3 ? 'md:row-span-2 md:h-72 lg:h-80 md:mt-auto' : c === 5 || c === 6 ? 'sm:h-32! md:h-28 lg:h-32' : 'md:h-48 lg:h-56'} ${c === 2 ? 'md:row-span-2 md:mt-auto mb-0 md:mb-13' : 'overflow-hidden'} ${c === 1 ? 'sm:row-span-2! sm:mt-auto sm:h-80' : ''} ${c === 5 ? 'sm:col-span-2 md:col-span-1' : ''}`}
            >
              <div
                className={`${c === 2 ? 'h-full md:h-48 lg:h-56' : 'h-full'}`}
              >
                <Image
                  height={224}
                  width={224}
                  src={
                    `/images/${category.slug}/${cat.slug}.jpg` ||
                    '/images/hat.jpg'
                  }
                  alt={cat.name}
                  className="object-cover w-full h-full transition-transform duration-300 rounded-2xl"
                />
              </div>
              {c === 2 && (
                <div className="my-2 hidden md:block">
                  <LinkButton
                    linkName={'All Collection'}
                    linkHref={`/c/${category.slug}`}
                    style="w-full flex-none text-xs"
                  ></LinkButton>
                </div>
              )}

              <div
                className={`absolute top-0 w-full bg-linear-to-t dark:bg-linear-to-b from-black/70 to-50% h-full p-2 rounded-2xl ${
                  activeIndex === c ? 'opacity-0' : 'opacity-100'
                }`}
              >
                <h1
                  className={`${antonFont.className} font-semibold text-lg uppercase text-[#1b1a1e] dark:text-[#ededed]`}
                >
                  {cat.name}
                </h1>
              </div>

              {activeIndex !== c && (
                <button
                  className="rounded-full bg-[#1b1a1e] text-[#ededed] p-1 mx-1 text-2xl absolute bottom-2 right-2 rotate-45 z-10"
                  aria-label="See more"
                  onClick={
                    cat.subcategories?.length === 0
                      ? () => router.push(`/c/${category.slug}/${cat.slug}`)
                      : () => setActiveIndex(activeIndex === c ? null : c)
                  }
                >
                  <IoArrowForward />
                </button>
              )}

              {cat.subcategories && cat.subcategories.length > 0 && (
                <div
                  className={`absolute inset-0 dark:text-[#ededed] dark:bg-[#1b1a1e]/80 text-black bg-[#ededed]/80 backdrop-blur-xs p-1.5 flex flex-col justify-start transition-all duration-300
            ${activeIndex === c ? 'opacity-100 translate-y-0 pointer-events-auto z-10' : 'opacity-0 translate-y-5 pointer-events-none z-0'}
             `}
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
                  <button
                    className="text-2xl absolute top-0 right-0 hover:scale-125 p-2"
                    onClick={() => setActiveIndex(activeIndex === c ? null : c)}
                  >
                    <IoClose />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </HorizontalScrollButton>
    </main>
  );
}
