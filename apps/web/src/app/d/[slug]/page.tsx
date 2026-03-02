import { getProducts, getTags } from '@/api/product';
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

  console.log(tag);

  const products = await getProducts(slug, tag);
  const tags = await getTags();

  if (slug === 'men') return <MenView products={products} tags={tags} />;
  if (slug === 'women') return <WomenView products={products} tags={tags} />;
  if (slug === 'kids') return <KidsView products={products} tags={tags} />;
  if (slug === 'sports') return <SportsView products={products} tags={tags} />;
  if (slug === 'groomity')
    return <GroomityView products={products} tags={tags} />;

  return <HomeView />;
}
