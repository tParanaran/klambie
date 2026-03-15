import { IoMail } from 'react-icons/io5';
import SocialMediaLink from './socialMediaLink';
import Link from 'next/link';

export default function VerificationContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="px-3 flex justify-center">
      <div className="space-y-5 w-full max-w-xl text-center nav-bg rounded-2xl p-10 mt-[2%] mb-[8%]">
        <div className="text-6xl p-10 sm:text-8xl sm:p-14 rounded-full bg-black/10 dark:bg-white/10 w-fit mx-auto">
          <IoMail />
        </div>
        {children}
        <p>
          Need help?{' '}
          <Link
            className="text-orange-800 dark:text-orange-600"
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
