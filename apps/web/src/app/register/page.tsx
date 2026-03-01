import RegisterView from '@/views/pages/register';

export default async function Register({
  searchParams,
}: {
  searchParams: { refferal: string };
}) {
  const { refferal } = await searchParams;
  return (
    <main>
      <RegisterView refferal={refferal} />
    </main>
  );
}
