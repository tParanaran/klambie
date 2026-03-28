import { aboutText, missions } from '@/utils/about';
import { hoverEffect } from '@/utils/styling';
import TitileContainer from '@/views/components/titleContainer';

export default function About() {
  return (
    <div className="my-10 lg:my-15 grid grid-cols-1 md:grid-cols-3">
      <div></div>
      <div className="md:col-span-2">
        <TitileContainer
          badge={'About Us'}
          title={'Built From Real Identity Backed By Real'}
          spanTitle="Brands and Creations"
          isFull={true}
        />
        <div className="my-10 lg:my-15">
          <p className="opacity-50 p-3 text-justify">{aboutText}</p>
          <div className="grid grid-cols-2 gap-10 mt-5 px-3">
            {missions.map((mission, m) => (
              <div
                key={m}
                className={`bg-primary px-5 pt-3 pb-5 rounded-2xl relative  ${hoverEffect}`}
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
