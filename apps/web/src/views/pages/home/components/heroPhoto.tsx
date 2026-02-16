import { photo } from '@/utils/photo';
import PhotoContainer from './photoContainer';

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
