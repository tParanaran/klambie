'use client';
import useBanner from '../hook/useBanner';

export default function BannerHero({ slug }: { slug: string }) {
  const { banners } = useBanner();

  const bannersegments = banners.filter((banner) =>
    banner.categories.includes(slug),
  );

  // NEXT FEATURE
  return (
    <>
      {bannersegments && bannersegments.length > 0 && (
        <div className="flex overflow-x-scroll space-x-5 scrollbar-hide mt-5">
          {bannersegments.map((banner) => {
            if (banner.active)
              return (
                <div
                  key={banner.id}
                  className="h-64 w-full flex-none bg-primary rounded-2xl p-3"
                >
                  <div className="grid grid-cols-2 uppercase">
                    <div>
                      <h1>{banner.title}</h1>
                    </div>
                  </div>
                </div>
              );
          })}
        </div>
      )}
    </>
  );
}
