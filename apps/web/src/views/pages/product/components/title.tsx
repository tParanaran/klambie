import Link from 'next/link';

interface ITitle {
  slug: string;
  categories?: string[];
  brand: string;
  name: string;
}

export default function Title({ title }: { title: ITitle }) {
  const { categories, brand, name, slug } = title;

  return (
    <>
      <div className="flex space-x-1 pb-2 sm:pb-5 flex-wrap mr-10 uppercase text-xs">
        {categories?.map((category, c) => (
          <Link
            key={c}
            href={'/'}
            className="px-3 py-1 rounded-full mt-1 bg-orange-800 text-[#ededed] flex items-center hover:bg-orange-700"
          >
            {category}
          </Link>
        ))}
      </div>

      <Link href={`/p/${slug}`} aria-label={name}>
        <h1 className="font-bold lg:text-lg">{brand}</h1>
        <h1 className="font-light lg:text-lg">{name}</h1>
      </Link>
    </>
  );
}
