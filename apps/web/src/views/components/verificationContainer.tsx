import { IoMail } from 'react-icons/io5';
import SocialMediaLink from './socialMediaLink';
import Link from 'next/link';

export default function VerificationContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="px-3">
      <div className="space-y-5 w-full md:w-9/12 lg:w-1/2 mx-auto text-center nav-bg rounded-2xl p-10 my-[6%]">
        <div className="text-6xl p-10 sm:text-8xl sm:p-14 rounded-full bg-black/10 w-fit mx-auto">
          <IoMail />
        </div>
        <h1 className="text-xl font-bold">Woowee! Please verify your email</h1>
        {children}
        <p>
          Need help?{' '}
          <Link
            className="text-orange-800"
            href={'/contact'}
            aria-label="Contact us"
          >
            {' '}
            Contact us
          </Link>
        </p>
        <SocialMediaLink />
      </div>
    </div>
  );
}
