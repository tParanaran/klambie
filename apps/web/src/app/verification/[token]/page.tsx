import VerificationView from '@/views/pages/vertification';

export default async function Verification({
  params,
}: {
  params: { token: string };
}) {
  const { token } = await params;

  return (
    <main>
      <VerificationView token={token} />
    </main>
  );
}
