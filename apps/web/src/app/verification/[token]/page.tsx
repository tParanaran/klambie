import VerificationContainer from '@/views/components/verificationContainer';
import VeritificationButton from '@/views/pages/vertification/components/vertificationButton';

export default async function Verification({
  params,
}: {
  params: { token: string };
}) {
  const { token } = await params;

  return (
    <main>
      <VerificationContainer>
        <h1 className="text-xl font-bold">Woowee! Please verify your email</h1>
        <p className="my-12">
          Please confirm that you want to use this as your Klambie account email
          address. Once it's done you will be able to start shopping!
        </p>
        <VeritificationButton token={token} />
      </VerificationContainer>
    </main>
  );
}
