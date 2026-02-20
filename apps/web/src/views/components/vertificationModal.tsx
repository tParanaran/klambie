import VerificationContainer from '@/views/components/verificationContainer';
import Link from 'next/link';

export default function VertificationdModal({ html }: { html: string }) {
  return (
    <div className="fixed h-full w-full top-0 left-0 z-50">
      <div className="absolute h-screen w-full bg-[#ffff] dark:bg-black">
        {' '}
        <VerificationContainer>
          <div dangerouslySetInnerHTML={{ __html: html }} />
          <p className="mt-10 mb-5">Still can't find the email? No problem</p>
          <div className="flex space-x-2 flex-wrap justify-center">
            <button className="rounded-full py-2 sm:py-3 px-4 bg-orange-800 text-[#ededed] hover:bg-orange-700 font-semibold uppercase">
              Resend Email
            </button>
            <Link
              href={'/'}
              className="py-2 sm:py-3 px-4 text-orange-800 font-semibold uppercase"
            >
              Return to Site
            </Link>
          </div>
        </VerificationContainer>
      </div>
    </div>
  );
}
