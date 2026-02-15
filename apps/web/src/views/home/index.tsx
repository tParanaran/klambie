import HeroMain from '@/components/home/hero-main';
import HeroPhoto from '@/components/home/hero-photo';
import HeroText from '@/components/home/hero-text';

export default async function HomeView() {
  return (
    <div className="pb-[5%]">
      <div className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 mb-7 gap-4">
          <div className="row-span-2">
            <HeroMain />
          </div>
          <div>
            <div className="grid gap-4 h-fit">
              <div className="block lg:hidden">
                <HeroPhoto />
              </div>
              <HeroText />
            </div>
          </div>
          <div className="hidden lg:block h-fit">
            <HeroPhoto />
          </div>
        </div>
        <div
          id="shopBy"
          className="h-12 absolute bottom-0 left-0 right-0"
        ></div>
      </div>
    </div>
  );
}
