import { antonFont } from '@/utils/fonts';
import Image from 'next/image';

export default function HeroPhoto() {
  const photo = [
    { idx: 1, src: '/cap.jpg', alt: 'Cap', text: '#Trending 2026' },
    { idx: 2, src: '/hat.jpg', alt: 'Hat', text: '#OldButGold' },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {photo.map((item, idx) => (
        <div
          key={idx}
          className="relative w-full rounded-2xl bg-black"
          style={{ height: '16.5rem' }}
        >
          <div className="absolute h-full w-full bg-linear-to-t from-black/70 to-transparent rounded-2xl"></div>
          <Image
            key={idx}
            src={item.src}
            alt={item.alt}
            loading="lazy"
            width={400}
            height={200}
            className="object-cover h-full w-full rounded-2xl"
          />
          <div
            className={`absolute bottom-5 left-5 text-[#ededed] text-3xl uppercase tracking-tight ${antonFont.className}`}
          >
            <h1>{item.text}</h1>
          </div>
        </div>
      ))}
    </div>
  );
}
