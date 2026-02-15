import NavLink from './nav-link';

export default function MobileMenu({ isScroll }: { isScroll: boolean }) {
  return (
    <div
      className={`fixed lg:hidden z-50 w-auto h-fit md:w-1/2 rounded-2xl left-3 right-3 sm:right-10 sm:left-10  p-2 sm:p-5
         bg-black/70 backdrop-blur-lg mt-0.5 sm:mt-1.5 translate-x-0 max-h-[55vh] overflow-y-auto
         ${isScroll ? 'top-14' : 'top-24'}`}
    >
      <NavLink
        classDiv="flex gap-2 flex-wrap"
        classLink="flex bg-background flex-1/3 hover:bg-orange-700 hover:text-[#ededed] w-auto h-18 justify-center items-center rounded-2xl"
      />
    </div>
  );
}
