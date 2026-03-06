import axiosInstanceServer from '@/lib/axios/server';
import GroomityView from '@/views/pages/groomity';
import HomeView from '@/views/pages/home';
import KidsView from '@/views/pages/kids';
import MenView from '@/views/pages/men';
import SportsView from '@/views/pages/sports';
import WomenView from '@/views/pages/women';

export default async function Department({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { tag: string };
}) {
  const { slug } = await params;
  const { tag } = await searchParams;
  const { data } = await axiosInstanceServer.get(`/product/all/${slug}`, {
    params: { tag },
  });
  const tags = await axiosInstanceServer.get('/attribute/tag');

  if (slug === 'men') return <MenView products={data} tags={tags.data} />;
  if (slug === 'women') return <WomenView products={data} tags={tags.data} />;
  if (slug === 'kids') return <KidsView products={data} tags={tags.data} />;
  if (slug === 'sports') return <SportsView products={data} tags={tags.data} />;
  if (slug === 'groomity')
    return <GroomityView products={data} tags={tags.data} />;

  return <HomeView />;
}
