import Link from 'next/link';
import useAttribute from '../hooks/useAttribute';
import { useQueryParams } from '../hooks/useQueryParams';

export default function Footer() {
  const { categories } = useAttribute();
  const { matchPathname } = useQueryParams();

  const matchCategory = categories.filter((cat) => cat.slug === matchPathname);

  return (
    <div className=" bg-black/5 dark:bg-white/10 rounded-2xl py-5 mb-5 w-full flex items-center">
      <div className="w-full lg:w-1/2 flex space-x-3 flex-wrap items-center justify-around mx-auto">
        <Link
          className="p-3"
          href={`/c/${matchCategory[0].slug}`}
          aria-label={matchCategory[0].slug}
        >
          <p className="text-xs">{matchCategory[0].name}`s Home</p>
        </Link>
        {matchCategory[0].subcategories?.map((cat) => (
          <Link
            key={cat.slug}
            className="p-3"
            href={`/c/${matchCategory[0].slug}/${cat.slug}`}
            aria-label={cat.name}
          >
            <p className="text-xs">
              {matchCategory[0].name}`s {cat.name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
