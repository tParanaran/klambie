'use client';
import HorizontalScrollButton from '../../d/components/buttonScroll';
import PhotoContainer from './photoContainer';
import TextContainer from './textContainer';

export default function HeroSwiperMobile() {
  return (
    <HorizontalScrollButton>
      <div className="flex space-x-2">
        <TextContainer />
        <PhotoContainer />
      </div>
    </HorizontalScrollButton>
  );
}
