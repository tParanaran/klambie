import WalkingTextAnimation from '@/views/components/walkingTextAnimation';

export default function BannerAnimation() {
  return (
    <nav className="bg-black/90 py-2.5 text-nowrap text-[#ededed] text-center text-sm uppercase font-light overflow-hidden">
      <WalkingTextAnimation
        text='Free shipping on Indonesia orders over Rp300k. Get discount up to 50%
        and cashback up to 25%. Free Return and Fast Delivery. Use Code:
        "NEWKLAMBIE50" and GET 50K DISCOUNT FOR FIRST TIME ORDER."'
      />
    </nav>
  );
}
