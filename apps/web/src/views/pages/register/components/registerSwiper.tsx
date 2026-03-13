'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { IoEarth, IoGlobe } from 'react-icons/io5';

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
      <SwiperSlide>
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <div className="p-1.5 bg-black rounded-full text-[#ededed]  text-2xl">
              <IoGlobe />
            </div>
            <h1 className="font-semibold uppercase lg:text-lg">Mission</h1>
          </div>
          <p className="text-sm lg:text-base">
            We are on a mission to empower creative independence in a commersial
            world and incredible.
          </p>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <div className="p-1.5 bg-black rounded-full text-2xl text-[#ededed] ">
              <IoEarth />
            </div>
            <h1 className="font-semibold uppercase lg:text-lg">
              Sustainbility
            </h1>
          </div>
          <p className="text-sm lg:text-base">
            We are challenging conventional retail, putting an end to dead
            stock, unconventional waste and more funtastic.
          </p>
        </div>
      </SwiperSlide>
    </Swiper>
  );
}
