import Image from 'next/image';

const desktopPattern = [
  {
    className: 'row-span-2 rounded-t-full rounded-bl-full',
    image: '/images/about/about-8.jpg',
    inner: true,
  },
  {
    className: 'rounded-t-full rounded-bl-full',
    image: '/images/about/about-1.jpg',
  },
  {
    className: 'rounded-t-full rounded-br-full',
  },
  {
    className: 'rounded-tl-full rounded-b-full',
  },
  {
    className: 'rounded-tr-full rounded-br-full',
    image: '/images/about/about-2.jpg',
  },

  {
    className: 'col-span-2 rounded-t-full rounded-bl-full',
    image: '/images/about/about-4.jpg',
    inner: true,
  },
  {
    className: 'rounded-tr-full rounded-full',
    image: '/images/about/about-7.jpg',
  },
  { className: 'rounded-t-full rounded-bl-full' },
  {
    className: 'rounded-t-full rounded-br-full',
    image: '/images/about/about-6.jpg',
  },
  {
    className: 'row-span-2 rounded-tr-full rounded-b-full flex items-end',
    image: '/images/about/about-5.jpg',
    inner: true,
  },
  {
    className: 'rounded-b-full rounded-tl-full',
    image: '/images/about/about-3.jpg',
  },
  { className: 'rounded-b-full rounded-tr-full' },
];

export default function AboutPattern() {
  return (
    <div
      className={`hidden md:grid md:grid-cols-3 md:auto-cols-[98px] md:auto-rows-[98px] gap-1 mt-5`}
    >
      {desktopPattern.map((item, i) => (
        <div
          key={i}
          className={`relative bg-primary overflow-hidden ${item.className}`}
        >
          {item.image && item.inner === undefined && (
            <Image
              src={item.image}
              alt={item.image}
              fill
              className="object-cover"
            />
          )}
          {item.inner && (
            <div className="relative w-24.5 h-24.5 rounded-full bg-primary overflow-hidden">
              {item.image && (
                <Image src={item.image} alt="" fill className="object-cover" />
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
