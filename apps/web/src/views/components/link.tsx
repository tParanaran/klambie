import Link from 'next/link';
interface ILinkButton {
  linkName: string;
  linkHref: string;
  style?: string;
}

export default function LinkButton({ linkHref, linkName, style }: ILinkButton) {
  return (
    <Link href={linkHref}>
      <button
        aria-label={linkName}
        className={`rounded-full py-2.5 md:py-3 px-4 bg-orange-800 text-light hover:bg-orange-700 font-semibold uppercase ${style}`}
      >
        {linkName}
      </button>
    </Link>
  );
}
