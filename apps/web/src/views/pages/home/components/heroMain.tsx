import Image from 'next/image';
import ContactLink from './contactLink';

export default function HeroMain() {
  return (
    <div className="relative h-80 lg:h-full rounded-2xl bg-black">
      <div className="absolute h-full w-full bg-linear-to-t from-black/90 to-transparent rounded-2xl"></div>
      <Image
        src={'/header-img.jpg'}
        className="object-cover auto h-full w-full rounded-2xl"
        width={300}
        height={400}
        alt="Hero Picture"
        loading="lazy"
        aria-placeholder="blur"
      />
      <ContactLink />
    </div>
  );
}
