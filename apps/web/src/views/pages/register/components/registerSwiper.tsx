'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { missions } from '@/utils/about';

export default function RegisterSwiper() {
  return (
    <Swiper
      modules={[Autoplay]}
      slidesPerView={1}
      keyboard={{
        enabled: true,
      }}
      loop={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
    >
      {missions.map((mission, m) => (
        <SwiperSlide key={m}>
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <div className="p-1.5 bg-primary rounded-full text-dark text-2xl">
                <mission.Icon />
              </div>
              <h1 className="font-semibold uppercase lg:text-lg">
                {mission.label}
              </h1>
            </div>
            <p className="text-sm lg:text-base">{mission.text}</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
