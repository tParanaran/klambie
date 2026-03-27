import CategoryHome from './components/categories';
import HeroMain from './components/heroMain';
import HeroSwiper from './components/heroSwiper';
import HeroSwiperMobile from './components/heroSwiperMobile';
import HeroTitle from './components/heroTittle';
import NavbarHome from './components/navbar';

export default async function HomeView() {
  return (
    <div className="md:mt-8 pb-[5%]">
      <div className="relative overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_1.5fr] gap-3 relative rounded-2xl overflow-hidden p-2">
          <div className="space-y-2 sm:space-y-5">
            <NavbarHome />
            <HeroTitle />
          </div>

          <div>
            <div className="hidden sm:block relative">
              <HeroMain />
              <div className="absolute z-10 bottom-52 w-20.5 left-0 h-20 bg-[rgb(var(--background-start-rgb))]! rounded-tr-2xl inverted-radius-bl"></div>
              <div className="absolute z-10 bottom-12 w-20.5 left-0 h-20 bg-[rgb(var(--background-start-rgb))]! rounded-tr-2xl inverted-radius-tl"></div>
            </div>
            <div className="block sm:hidden my-5">
              <HeroSwiperMobile />
            </div>
          </div>
        </div>
        <HeroSwiper />
      </div>
      <CategoryHome />
    </div>
  );
}
