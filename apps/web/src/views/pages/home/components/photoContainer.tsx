import { antonFont } from '@/utils/fonts';
import { photoTags } from '@/utils/photoTags';
import Image from 'next/image';
import Link from 'next/link';

export default function PhotoContainer() {
  return (
    <>
      {photoTags.map((item, i) => (
        <Link key={i} href={item.href} aria-label={item.alt}>
          <div className="relative rounded-2xl overflow-hidden bg-black h-46 w-46 flex-none">
            <div className="absolute h-full w-full bg-linear-to-t from-black/70 to-transparent rounded-2xl"></div>
            <Image
              src={item.src}
              alt={item.alt}
              loading="lazy"
              width={400}
              height={200}
              className="object-cover h-full w-full rounded-2xl"
            />
            <div
              className={`absolute bottom-2 left-2 text-light text-2xl uppercase tracking-tight ${antonFont.className}`}
            >
              <h1>{item.text}</h1>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
}
