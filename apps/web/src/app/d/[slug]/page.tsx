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

  let products = [];
  let error;

  try {
    const { data } = await axiosInstanceServer.post(`/product/all`, {
      tag,
      slugs: [slug],
    });
    products = data.products;
  } catch (error: any) {
    products = [];
    error = error.message || 'Something went wrong while fetching data.';
  }
  const viewProps = { products, error };

  switch (slug) {
    case 'men':
      return <MenView {...viewProps} />;
    case 'women':
      return <WomenView {...viewProps} />;
    case 'kids':
      return <KidsView {...viewProps} />;
    case 'sports':
      return <SportsView {...viewProps} />;
    case 'groomity':
      return <GroomityView {...viewProps} />;
    default:
      return <HomeView />;
  }
}
