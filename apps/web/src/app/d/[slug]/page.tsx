import { Notify } from '@/lib/notify';
import axiosInstanceServer from '@/lib/axios/server';
import MenView from '@/views/pages/d/men';
import WomenView from '@/views/pages/d/women';
import KidsView from '@/views/pages/d/kids';
import SportsView from '@/views/pages/d/sports';
import GroomityView from '@/views/pages/d/groomity';
import HomeView from '@/views/pages/home';

export default async function Department({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { tag: string };
}) {
  const { slug } = await params;
  const { tag } = await searchParams;

  let products = null;
  let tags = null;

  try {
    const { data } = await axiosInstanceServer.get(`/product/all/${slug}`, {
      params: { tag },
    });
    const res = await axiosInstanceServer.get('/attribute/tag');
    products = data;
    tags = res.data;
  } catch (error) {
    Notify('Something go wrong');
  }

  if (slug === 'men') return <MenView products={products} tags={tags} />;
  if (slug === 'women') return <WomenView products={products} tags={tags} />;
  if (slug === 'kids') return <KidsView products={products} tags={tags} />;
  if (slug === 'sports') return <SportsView products={products} tags={tags} />;
  if (slug === 'groomity')
    return <GroomityView products={products} tags={tags} />;

  return <HomeView />;
}
