'use client';
import useBanner from '../hook/useBanner';

export default function BannerHero({ slug }: { slug: string }) {
  const { banners } = useBanner();

  const bannersegments = banners.filter((banner) =>
    banner.categories.includes(slug),
  );

  console.log(bannersegments);

  return (
    <div className="grid grid-cols-[1fr_2fr_3fr]">
      <div></div>
      {bannersegments && bannersegments.length > 0 && (
        <div className="flex overflow-x-scroll">
          {bannersegments.map((banner) => {
            if (banner.active)
              return (
                <div key={banner.id} className="h-40 flex-none w-full">
                  <h1>{banner.title}</h1>
                </div>
              );
          })}
        </div>
      )}
      <div></div>
    </div>
  );
}
