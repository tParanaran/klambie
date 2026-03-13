import { FreeMode, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { IImages } from '../types/product.types';
import { IoClose } from 'react-icons/io5';

interface ISingleImage {
  image: { attributeId: number | null; url: string };
  images?: never;
  showImagesHandler: () => void;
}

interface IMultipleImages {
  images: IImages[];
  image?: { attributeId: number | null; url: string };
  showImagesHandler: () => void;
}

type IShowImages = ISingleImage | IMultipleImages;

export default function ShowImages({
  image,
  images,
  showImagesHandler,
}: IShowImages) {
  const hasMultipleImages = images && images.length > 0;

  return (
    <div
      className="fixed z-50 top-0 left-0 w-full h-full bg-black/80 backdrop-blur-lg flex justify-center items-center"
      onClick={showImagesHandler}
    >
      <div
        className="relative w-auto max-w-7xl my-5 mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Single Image */}
        {!hasMultipleImages && image && (
          <img
            src={image.url}
            alt={`Product Image`}
            className="object-cover w-auto max-h-[80vh] mx-auto"
            width={400}
            height={600}
            loading="lazy"
          />
        )}

        {/* Multiple Images Carousel */}
        {hasMultipleImages && (
          <Swiper
            slidesPerView={1}
            spaceBetween={0}
            loop={images.length > 1}
            freeMode={true}
            watchSlidesProgress={true}
            pagination={{ clickable: true }}
            modules={[FreeMode, Pagination]}
            breakpoints={{
              640: { slidesPerView: 1.5 },
              768: { slidesPerView: 2.2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {image && (
              <SwiperSlide key="main-image">
                <img
                  src={image.url}
                  alt={`Product Image`}
                  className="w-full object-cover"
                  width={300}
                  height={400}
                  loading="lazy"
                />
              </SwiperSlide>
            )}

            {images.map((img, i) => (
              <SwiperSlide key={i}>
                <img
                  src={img.url}
                  alt={`Product Image ${i + 1}`}
                  className="w-full object-cover"
                  width={300}
                  height={400}
                  loading="lazy"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {/* Close Button */}
        <button
          onClick={showImagesHandler}
          aria-label="Close zoom image"
          className="absolute right-3 top-3 z-50 text-black hover:scale-125 transition-transform"
        >
          <IoClose className="text-2xl" />
        </button>
      </div>
    </div>
  );
}
