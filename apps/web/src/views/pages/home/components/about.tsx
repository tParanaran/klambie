'use client';
import { aboutText, missions } from '@/utils/about';
import { hoverEffect } from '@/utils/styling';
import TitileContainer from '@/views/components/titleContainer';
import HorizontalScrollButton from '../../d/components/buttonScroll';
import useDetectIsMobile from '../../template/hooks/useDetectIsMobile';
import AboutPattern from './aboutPattern';
import AboutPatternMobile from './aboutPatternMobile';

export default function About() {
  const { isMobile } = useDetectIsMobile({ widthScreen: 886, maxWitdh: 767 });
  return (
    <div className="my-10 lg:my-15 md:grid md:grid-cols-[300px_1fr]">
      <AboutPattern />

      <div className="mt-5 md:mt-0 sm:ml-5 lg:ml-24">
        <TitileContainer
          badge={'About Us'}
          title={'Built From Real Taste Backed By Real'}
          spanTitle="Brands and Creations"
          isFull={true}
        />

        <AboutPatternMobile />

        <div className="mt-10 lg:mt-15">
          <p className="opacity-50 p-3 text-justify">{aboutText}</p>

          <div className={isMobile ? '-ml-81.25' : ''}>
            <HorizontalScrollButton>
              <div className="grid grid-flow-col auto-cols-[16rem] sm:grid-cols-2 sm:auto-cols-auto gap-5 lg:gap-10 mt-5 px-3">
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
