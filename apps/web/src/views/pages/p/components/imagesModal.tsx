import 'swiper/css';
import 'swiper/css/pagination';
import { FreeMode, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { IImages } from '../types/product.types';
import { IoClose } from 'react-icons/io5';

interface ISingleImage {
  image: { attributeId: number | null; url: string };
  images?: IImages[];
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
      className="fixed z-50 top-0 left-0 w-full h-full bg-[#1b1a1e]/80 backdrop-blur-xl flex justify-center items-center"
      onClick={showImagesHandler}
    >
      <div
        className="relative w-screen max-w-7xl my-5 mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Single Image */}
        {!hasMultipleImages && image && (
          <div className="relative sm:w-sm mx-auto">
            <img
              src={image.url}
              alt={`Product Image`}
              className="object-cover max-h-[75vh] w-full sm:w-auto rounded-2xl"
              width={400}
              height={600}
              loading="lazy"
            />
            <button
              onClick={showImagesHandler}
              aria-label="Close zoom image"
              className="absolute right-3 top-3 z-50 text-black hover:scale-125 transition-transform"
            >
              <IoClose className="text-2xl" />
            </button>
          </div>
        )}

        {/* Multiple Images Carousel */}
        {hasMultipleImages && (
          <div>
            <Swiper
              slidesPerView={1}
              spaceBetween={5}
              centeredSlides={true}
              loop={images.length > 1}
              freeMode={true}
              watchSlidesProgress={true}
              pagination={{ clickable: true }}
              modules={[FreeMode, Pagination]}
              breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 2.5 },
                1024: { slidesPerView: 3 },
              }}
            >
              {image && (
                <SwiperSlide key="main-image">
                  <img
                    src={image.url}
                    alt={`Product Image`}
                    className="max-h-[75vh] object-cover w-full rounded-2xl"
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
                    className="max-h-[75vh] object-cover w-full rounded-2xl"
                    width={300}
                    height={400}
                    loading="lazy"
                  />
                </SwiperSlide>
              ))}
            </Swiper>{' '}
            {/* Close Button */}
            <button
              onClick={showImagesHandler}
              aria-label="Close zoom image"
              className="absolute right-3 top-3 z-50 text-black hover:scale-125 transition-transform"
            >
              <IoClose className="text-2xl" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
