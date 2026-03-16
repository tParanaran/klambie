import { useState } from 'react';
import ImageSwiper from './swiper';
import ShowImages from './imagesModal';

interface IImages {
  images: { attributeId: number | null; url: string }[];
  selectedColorId: number | undefined;
}

export default function Images({ images, selectedColorId }: IImages) {
  const [showImages, setShowImages] = useState<boolean>(false);

  const withAttribute =
    images.filter((item) => item.attributeId !== null) || [];
  const withoutAttribute =
    images.filter((item) => item.attributeId === null) || [];
  const image =
    images.find((img) => Number(img.attributeId) === Number(selectedColorId)) ||
    withAttribute[0];

  const showImagesHandler = () => {
    setShowImages(!showImages);
  };

  return (
    <>
      <div
        className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2"
        onClick={showImagesHandler}
        aria-label="Zoom images"
        role="button"
      >
        <ImageSwiper
          images={withAttribute}
          selectedColorId={selectedColorId}
          className={'object-cover w-full'}
        />
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
      {showImages && (
        <ShowImages
          image={image}
          images={withoutAttribute}
          showImagesHandler={showImagesHandler}
        />
      )}
    </>
  );
}
