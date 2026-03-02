import GroomityView from '@/views/pages/groomity';
import HomeView from '@/views/pages/home';
import KidsView from '@/views/pages/kids';
import MenView from '@/views/pages/men';
import SportsView from '@/views/pages/sports';
import WomenView from '@/views/pages/women';

export default async function Department({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;

  console.log(slug);

  if (slug === 'men') return <MenView slug={slug} />;
  if (slug === 'women') return <WomenView slug={slug} />;
  if (slug === 'kids') return <KidsView slug={slug} />;
  if (slug === 'sports') return <SportsView slug={slug} />;
  if (slug === 'groomity') return <GroomityView slug={slug} />;

  return <HomeView />;
}
