import 'swiper/css';
import 'swiper/css/navigation';
import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperTypes } from 'swiper/types';
import { Pagination } from 'swiper/modules';

interface IImages {
  images: { attributeId: number | null; url: string }[];
  selectedColorId: number | undefined;
}

export default function Images({ images, selectedColorId }: IImages) {
  const [isModal, setIsModal] = useState<boolean>(false);
  const swiperRef = useRef<SwiperTypes | null>(null);
  const withAttribute =
    images.filter((item) => item.attributeId !== null) || [];
  const withoutAttribute =
    images.filter((item) => item.attributeId === null) || [];

  useEffect(() => {
    if (!selectedColorId || !swiperRef.current) return;

    const imageIndex = withAttribute.findIndex(
      (img) => Number(img.attributeId) === Number(selectedColorId),
    );

    if (imageIndex !== -1 && swiperRef.current.activeIndex !== imageIndex) {
      swiperRef.current.slideTo(imageIndex, 400);
    }
  }, [selectedColorId, withAttribute]);

  return (
    <div
      className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2"
      onClick={() => setIsModal(true)}
    >
      {withAttribute.length > 0 ? (
        <div className="order-last md:order-first">
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            loop={true}
            modules={[Pagination]}
          >
            {withAttribute.map((image) => (
              <SwiperSlide key={image.attributeId}>
                <img
                  src={image.url}
                  className="object-cover w-full"
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

      {withoutAttribute.map((image, idx) => (
        <div key={idx}>
          <img
            src={image.url}
            className="w-full object-cover"
            alt={`Product Image ${idx}`}
            width={300}
            height={400}
            aria-placeholder="blur"
          />
        </div>
      ))}
    </div>
  );
}
