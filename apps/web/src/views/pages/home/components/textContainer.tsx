import Image from 'next/image';
export default function TextContainer() {
  return (
    <div className="w-36 lg:w-48 flex-none">
      <Image
        src={'/icon.svg'}
        alt={'Klambie icon'}
        width={25}
        height={25}
        className="w-10 mb-3"
      />
      <p className="uppercase opacity-50 text-sm">
        Klambie blends handpicked products from established real brands with our
        own original collections.
      </p>
    </div>
  );
}
