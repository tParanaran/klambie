import { antonFont } from '@/utils/fonts';
import Image from 'next/image';

interface IPhotoContainer {
  src: string;
  alt: string;
  text: string;
  height: string;
}

export default function PhotoContainer({
  src,
  alt,
  text,
  height,
}: IPhotoContainer) {
  return (
    <div className="relative w-full rounded-2xl bg-black" style={{ height }}>
      <div className="absolute h-full w-full bg-linear-to-t from-black/70 to-transparent rounded-2xl"></div>
      <Image
        src={src}
        alt={alt}
        loading="lazy"
        width={400}
        height={200}
        className="object-cover h-full w-full rounded-2xl"
      />
      <div
        className={`absolute bottom-5 left-5 text-[#ededed] text-3xl uppercase tracking-tight ${antonFont.className}`}
      >
        <h1>{text}</h1>
      </div>
    </div>
  );
}
