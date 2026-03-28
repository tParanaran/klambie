import VerificationContainer from '@/views/components/verificationContainer';
import Link from 'next/link';

export default function VertificationdModal({ html }: { html: string }) {
  return (
    <div className="fixed top-0 left-0 z-50">
      <div className="absolute bg-light dark:bg-dark">
        {' '}
        <div className="flex justify-center items-center h-screen w-screen">
          {' '}
          <VerificationContainer>
            <div dangerouslySetInnerHTML={{ __html: html }} />
            <div className="flex space-x-2 flex-wrap justify-center">
              <Link
                href={'/verification'}
                className="rounded-full py-2 sm:py-3 px-4 bg-orange-800 text-light hover:bg-orange-700 font-semibold uppercase"
              >
                Resend Email
              </Link>
              <Link
                href={'/'}
                className="py-2 sm:py-3 px-4 text-orange-800 dark:text-active font-semibold uppercase"
              >
                Return to Site
              </Link>
            </div>
          </VerificationContainer>
        </div>
      </div>
    </div>
  );
}
