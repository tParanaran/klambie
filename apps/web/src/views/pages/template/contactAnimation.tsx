import { antonFont } from '@/utils/fonts';
import { redirect } from 'next/navigation';
import WalkingTextAnimation from '@/views/components/walkingTextAnimation';

export default function ContactAnimation({ mounted }: { mounted: boolean }) {
  return (
    <section
      className={`${antonFont.className} relative text-7xl md:text-8xl uppercase tracking-tight text-light bg-orange-800 py-12 cursor-pointer transition-all duration-500 ${
        mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'
      }`}
      onClick={() => redirect('/contact')}
      aria-label="Contact us"
    >
      <WalkingTextAnimation text="Want to Design Your Own? Calm, We Can Do It! Let's Talk Guys!  " />
    </section>
  );
}
