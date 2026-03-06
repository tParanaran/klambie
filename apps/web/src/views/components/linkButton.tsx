import Link from 'next/link';
interface ILinkButton {
  linkName: string;
  linkHref: string;
}

export default function LinkButton({ linkHref, linkName }: ILinkButton) {
  return (
    <Link href={linkHref}>
      <button
        aria-label={linkName}
        className="rounded-full py-2 sm:py-3 px-4 bg-orange-800 text-[#ededed] hover:bg-orange-700 font-semibold uppercase"
      >
        {linkName}
      </button>
    </Link>
  );
}
