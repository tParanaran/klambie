'use client';

import { photoTags } from '@/utils/photoTags';
import { useRef, useState } from 'react';
import { IoArrowBack, IoArrowForward } from 'react-icons/io5';
import useDetectIsMobile from '../../template/hooks/useDetectIsMobile';
import TextContainer from './textContainer';
import PhotoContainer from './photoContainer';

export default function HeroSwiper() {
  const { isMobile } = useDetectIsMobile({ widthScreen: 822 });
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [current, setCurrent] = useState<number>(1);
  const total = Math.ceil(
    (isMobile ? photoTags.length + 1 : photoTags.length) / 2,
  );

  const getItemWidth = () => {
    const container = sliderRef.current;
    if (!container) return 0;

    const first = container.children[0] as HTMLElement;
    const second = container.children[1] as HTMLElement;

    if (!second) return first.offsetWidth;

    return second.offsetLeft - first.offsetLeft;
  };

  const handleScroll = () => {
    const container = sliderRef.current;
    if (!container) return;

    const width = getItemWidth();

    const index = Math.round(container.scrollLeft / width) + 1;
    setCurrent(index);
  };

  const scrollRight = () => {
    const width = getItemWidth();
    sliderRef.current?.scrollBy({ left: width, behavior: 'smooth' });
  };

  const scrollLeft = () => {
    const width = getItemWidth();
    sliderRef.current?.scrollBy({ left: -width, behavior: 'smooth' });
  };

  return (
    <div className="hidden sm:block absolute h-60 w-fit z-10 bottom-14 left-0 bg-body bg-fixed py-3 pr-3 rounded-2xl">
      <div className="flex space-x-5">
        <TextContainer />
        <div className={`${isMobile ? 'w-[24rem]' : 'w-xl'}`}>
          <div
            ref={sliderRef}
            onScroll={handleScroll}
            className="flex space-x-3 overflow-x-scroll scrollbar-hide"
          >
            <PhotoContainer />
          </div>
          <div className="flex justify-between items-center mt-2 flex-row-reverse sm:flex-row">
            <span className="font-semibold text-sm sm:text-base text-orange-700">
              {current} / {total}
            </span>

            <div className="space-x-2">
              <button
                onClick={scrollLeft}
                className="rounded-full p-1 hover:text-orange-700"
              >
                <IoArrowBack className="text-2xl" />
              </button>
              <button
                onClick={scrollRight}
                className="rounded-full p-1 hover:text-orange-700"
              >
                <IoArrowForward className="text-2xl" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
