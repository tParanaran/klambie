import WalkingText from '../gsap';

export default function BannerWalkingText() {
  return (
    <nav className="bg-black/90 py-2 relative flex text-nowrap text-[#ededed] text-center text-sm uppercase font-light overflow-hidden">
      <WalkingText
        text='Free shipping on Indonesia orders over Rp300k. Get discount up to 50%
        and cashback up to 25%. Free Return and Fast Delivery. Use Code:
        "NEWKLAMBIE50" and GET 50K DISCOUNT FOR FIRST TIME ORDER."'
      />
    </nav>
  );
}
