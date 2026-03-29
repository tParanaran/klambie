'use client';
import { aboutText, missions } from '@/utils/about';
import { hoverEffect } from '@/utils/styling';
import TitileContainer from '@/views/components/titleContainer';
import HorizontalScrollButton from '../../d/components/buttonScroll';
import useDetectIsMobile from '../../template/hooks/useDetectIsMobile';

export default function About() {
  const { isMobile } = useDetectIsMobile({ widthScreen: 886, maxWitdh: 767 });
  return (
    <div className="my-10 lg:my-15 md:grid md:grid-cols-[300px_1fr]">
      <div
        className={`hidden md:grid md:grid-cols-3 md:grid-rows-5 gap-1 h-130 w-75 ${isMobile ? 'mb-10' : 'my-auto'}`}
      >
        <div className="row-span-2 bg-green-700 rounded-t-full rounded-bl-full">
          {' '}
          <div className="w-24.5 h-24.5 rounded-full bg-green-200"></div>
        </div>
        <div className="bg-orange-700 rounded-t-full rounded-bl-full"></div>
        <div className="bg-yellow-500 rounded-t-full rounded-br-full"></div>
        <div className="bg-orange-700 rounded-tl-full rounded-b-full"></div>
        <div className="row-span-2 bg-yellow-500 rounded-tr-full rounded-b-full flex items-end">
          <div className="w-24.5 h-24.5 rounded-br-full rounded-t-full bg-green-200"></div>
        </div>
        <div className="col-span-2 bg-green-700 rounded-t-full rounded-bl-full">
          <div className="w-24.5 h-24.5 rounded-full bg-green-200"></div>
        </div>
        <div className="bg-yellow-500 rounded-t-full rounded-bl-full"></div>
        <div className="bg-orange-700 rounded-t-full rounded-br-full"></div>
        <div className="row-span-2 bg-green-700 rounded-tr-full rounded-b-full flex items-end">
          <div className="w-24.5 h-24.5 rounded-full bg-green-200"></div>
        </div>
        <div className="bg-yellow-500 rounded-b-full rounded-tl-full"></div>
        <div className="bg-orange-700 rounded-b-full rounded-tr-full"></div>
      </div>

      <div className="mt-5 md:mt-0 sm:ml-5 lg:ml-24">
        <TitileContainer
          badge={'About Us'}
          title={'Built From Real Taste Backed By Real'}
          spanTitle="Brands and Creations"
          isFull={true}
        />

        <div
          className={`grid md:hidden grid-cols-5 grid-rows-3 gap-1 max-w-full h-60 w-90 sm:h-75 sm:w-130 mt-10 mx-auto overflow-hidden`}
        >
          <div className="bg-yellow-500 rounded-t-full rounded-bl-full"></div>
          <div className="bg-yellow-500 rounded-t-full rounded-br-full"></div>
          <div className="relative overflow-hidden left-0 row-span-2 bg-green-700 rounded-t-full rounded-br-full">
            <div className="absolute sm:h-24.5 sm:w-24.5 rounded-full bg-green-200"></div>
          </div>
          <div className="relative overflow-hidden col-span-2 bg-green-700 rounded-t-full rounded-br-full">
            <div className="absolute w-19 h-19 right-0 sm:w-24.5 sm:h-24.5 rounded-full bg-green-200"></div>
          </div>
          <div className="bg-orange-700 rounded-tl-full rounded-b-full"></div>
          <div className="bg-orange-700 rounded-b-full rounded-tr-full"></div>
          <div className="bg-orange-700 rounded-t-full rounded-bl-full"></div>
          <div className="bg-orange-700 rounded-t-full rounded-br-full"></div>
          <div className="relative overflow-hidden col-span-2 bg-green-700 rounded-tl-full rounded-b-full">
            <div className="absolute w-19 h-19 left-0 sm:w-24.5 sm:h-24.5 rounded-full bg-green-200"></div>
          </div>
          <div className="relative col-span-2 bg-yellow-500 rounded-tl-full rounded-b-full">
            <div className="absolute w-19 h-19 left-0 sm:w-24.5 sm:h-24.5 rounded-tr-full rounded-b-full bg-green-200"></div>
          </div>
          <div className="bg-yellow-500 rounded-b-full rounded-tr-full"></div>
        </div>

        <div className="mt-10 lg:mt-15">
          <p className="opacity-50 p-3 text-justify">{aboutText}</p>

          <div className={isMobile ? '-ml-81.25' : ''}>
            <HorizontalScrollButton>
              {' '}
              <div className="flex sm:grid sm:grid-cols-2 gap-5 lg:gap-10 mt-5 px-3">
                {missions.map((mission, m) => (
                  <div
                    key={m}
                    className={`bg-primary px-5 pt-3 pb-5 rounded-2xl relative w-64 sm:w-auto flex-none ${hoverEffect}`}
                  >
                    <h1 className="text-orange-800 dark:text-orange-700 mb-2 ml-7 font-semibold">
                      {mission.label}
                    </h1>
                    <p className="text-sm">{mission.text}</p>

                    <div className="absolute z-10 top-0 left-0 w-9 h-9 bg-body rounded-tl-2xl rounded-br-2xl inverted-radius-tl"></div>

                    <div className="absolute top-0 left-0 z-10 rounded-2xl bg-round-button p-1 text-xl">
                      <mission.icon />
                    </div>
                  </div>
                ))}{' '}
              </div>
            </HorizontalScrollButton>
          </div>
        </div>
      </div>
    </div>
  );
}
