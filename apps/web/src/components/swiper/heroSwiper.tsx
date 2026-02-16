'use client';

import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { photo } from '@/utils/photo';
import HeroMain from '../home/heroMain';
import PhotoContainer from '../home/photoContainer';

export default function HeroSwiper() {
  return (
    <div>
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        keyboard={{
          enabled: true,
        }}
        centeredSlides={true}
        pagination={{
          clickable: true,
        }}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
      >
        <SwiperSlide>
          <HeroMain />
        </SwiperSlide>
        {photo.map((item, idx) => (
          <SwiperSlide key={idx}>
            <PhotoContainer
              src={item.src}
              alt={item.src}
              text={item.text}
              height={'20rem'}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
