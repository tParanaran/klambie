import { useEffect, useRef, useState } from 'react';
import ImageSwiper from './swiper';

interface IImages {
  images: { attributeId: number | null; url: string }[];
  selectedColorId: number | undefined;
}

export default function Images({ images, selectedColorId }: IImages) {
  const [isModal, setIsModal] = useState<boolean>(false);

  const withAttribute =
    images.filter((item) => item.attributeId !== null) || [];
  const withoutAttribute =
    images.filter((item) => item.attributeId === null) || [];

  return (
    <div
      className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2"
      onClick={() => setIsModal(true)}
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
  );
}
