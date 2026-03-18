export default async function Search({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const { q } = await searchParams;
  return <div>This is {q}</div>;
}
