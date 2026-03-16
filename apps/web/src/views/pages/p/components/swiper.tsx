import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperTypes } from 'swiper/types';
import { Pagination } from 'swiper/modules';
import { useEffect, useRef } from 'react';

interface IImages {
  images: { attributeId: number | null; url: string }[];
  selectedColorId: number | undefined;
  className: string;
}

export default function ImageSwiper({
  images,
  selectedColorId,
  className,
}: IImages) {
  const swiperRef = useRef<SwiperTypes | null>(null);

  useEffect(() => {
    if (!selectedColorId || !swiperRef.current) return;

    const imageIndex = images.findIndex(
      (img) => Number(img.attributeId) === Number(selectedColorId),
    );

    if (imageIndex !== -1 && swiperRef.current.activeIndex !== imageIndex) {
      swiperRef.current.slideTo(imageIndex, 400);
    }
  }, [selectedColorId, images]);

  return (
    <>
      {' '}
      {images.length > 0 ? (
        <div className="order-last md:order-first">
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            loop={true}
            modules={[Pagination]}
          >
            {images.map((image) => (
              <SwiperSlide key={image.attributeId}>
                <img
                  src={image.url}
                  className={className}
                  alt={`Product Image ${image.attributeId}`}
                  width={300}
                  height={400}
                  aria-placeholder="blur"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : null}
    </>
  );
}
