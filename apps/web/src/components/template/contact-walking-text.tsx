import { antonFont } from '@/utils/fonts';
import { redirect } from 'next/navigation';
import WalkingText from '../gsap';

export default function ContactWalkingText() {
  return (
    <section
      className={`${antonFont.className} text-6xl sm:text-7xl md:text-8xl uppercase tracking-tight text-[#ededed] bg-orange-800 py-10 cursor-pointer`}
      onClick={() => redirect('/contact')}
      aria-label="Contact us"
    >
      <WalkingText text="Want to Design Your Own? Calm, We Can Do It! Let's Talk Guys!  " />
    </section>
  );
}
