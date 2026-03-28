import LinkButton from '@/views/components/link';
import { IoBagHandleOutline } from 'react-icons/io5';

export default function EmptyCart() {
  return (
    <div className="space-y-5 w-full mx-auto text-center my-20">
      <div className="text-6xl p-10 sm:text-8xl sm:p-14 rounded-full bg-black/10 dark:bg-white/10 w-fit mx-auto">
        <IoBagHandleOutline />
      </div>
      <div>
        <h1 className="font-semibold">Woowee! Your bag is empty.</h1>
        <p>Start filling it up with your favourites.</p>
      </div>
      <div>
        <LinkButton linkName="Let's go shopping!" linkHref={'/c'} />
      </div>
    </div>
  );
}
