import Link from 'next/link';
import { IoSparkles } from 'react-icons/io5';

export default function Tags({ tags }: { tags: string[] }) {
  return (
    <>
      {tags.map((tag, t) => (
        <Link
          href={'/'}
          key={t}
          aria-label={tag}
          className={`${
            t % 2 === 0
              ? 'bg-orange-800/80 text-white'
              : 'bg-gray-200/80 text-orange-700'
          } rounded-full py-1 px-2 w-fit flex items-center mb-1 font-semibold`}
        >
          <IoSparkles className="mr-0.5 text-xs" /> {tag}
        </Link>
      ))}
    </>
  );
}
