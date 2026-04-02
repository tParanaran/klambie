import WalkingTextAnimation from '@/views/components/walkingTextAnimation';

export default function BannerAnimation({ mounted }: { mounted: boolean }) {
  return (
    <div>
      <nav
        className={`relative bg-black/90 dark:bg-orange-800 py-2 text-nowrap text-light text-center text-sm uppercase font-light overflow-hidden transition-all duration-500 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'
        }`}
      >
        <WalkingTextAnimation
          text='Free shipping on Indonesia orders over Rp300k. Get discount up to 50%
        and cashback up to 25%. Free Return and Fast Delivery. Use Code:
        "NEWKLAMBIE50" and GET 50K DISCOUNT FOR FIRST TIME ORDER."'
        />
      </nav>
    </div>
  );
}
