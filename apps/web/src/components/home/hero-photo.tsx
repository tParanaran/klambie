import { antonFont } from '@/utils/fonts';
import Image from 'next/image';
import PhotoContainer from './photo-container';

export const photo = [
  { idx: 1, src: '/cap.jpg', alt: 'Cap', text: '#Trending 2026' },
  { idx: 2, src: '/hat.jpg', alt: 'Hat', text: '#OldButGold' },
];

export default function HeroPhoto() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {photo.map((item, idx) => (
        <PhotoContainer
          key={idx}
          src={item.src}
          alt={item.src}
          text={item.text}
          height={'16.5rem'}
        />
      ))}
    </div>
  );
}
