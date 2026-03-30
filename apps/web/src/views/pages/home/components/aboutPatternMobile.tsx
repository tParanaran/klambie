import Image from 'next/image';

const mobilePattern = [
  {
    className: 'rounded-t-full rounded-bl-full',
    image: '/images/about/about-3.jpg',
  },
  { className: 'rounded-t-full rounded-br-full' },
  {
    className: 'row-span-2 rounded-t-full rounded-br-full',
    image: '/images/about/about-4.jpg',
  },
  {
    className: 'col-span-2 rounded-t-full rounded-br-full',
    innerRight: true,
  },
  { className: 'rounded-tl-full rounded-b-full' },
  {
    className: 'rounded-b-full rounded-tr-full',
    image: '/images/about/about-6.jpg',
  },
  { className: 'rounded-t-full rounded-bl-full' },
  {
    className: 'rounded-t-full rounded-br-full',
    image: '/images/about/about-1.jpg',
  },
  {
    className: 'col-span-2 rounded-tl-full rounded-b-full',
    innerLeft: true,
  },
  { className: 'rounded-full', image: '/images/about/about-7.jpg' },
  { className: 'rounded-b-full', image: '/images/about/about-2.jpg' },
  { className: 'rounded-b-full rounded-tr-full' },
];

export default function AboutPatternMobile() {
  return (
    <div className="grid md:hidden grid-cols-5 sm:grid-cols-[repeat(5,98px)] auto-rows-[76px] sm:auto-rows-[98px] gap-1 max-w-full w-90 sm:w-130 mt-10 overflow-hidden mx-auto">
      {mobilePattern.map((item, i) => (
        <div
          key={i}
          className={`relative overflow-hidden bg-primary ${item.className}`}
        >
          {item.image && (
            <Image
              src={item.image}
              alt={item.image}
              fill
              className="object-cover"
            />
          )}

          {item.innerRight && (
            <div className="absolute right-0 w-19 h-19 sm:w-24.5 sm:h-24.5 rounded-full bg-primary overflow-hidden">
              <Image
                src="/images/about/about-8.jpg"
                alt="Images aboout"
                fill
                className="object-cover"
              />
            </div>
          )}

          {item.innerLeft && (
            <div className="absolute left-0 w-19 h-19 sm:w-24.5 sm:h-24.5 rounded-full bg-primary overflow-hidden">
              <Image
                src="/images/about/about-5.jpg"
                alt="Images aboout"
                fill
                className="object-cover"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
