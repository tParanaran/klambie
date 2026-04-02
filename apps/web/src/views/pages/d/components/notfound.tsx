import { LuSearchX } from 'react-icons/lu';

export default function SearchNotFound({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-5 w-full md:w-1/2 mx-auto text-center my-10">
      <div className="text-6xl p-10 sm:text-8xl rounded-full bg-black/10 w-fit mx-auto">
        <LuSearchX />
      </div>
      <div>
        <h1 className="font-semibold">
          Woowee! Product or category was not found.
        </h1>
        <p className="mt-3 tet-sm">
          The product you're looking for may be out of stock or no longer
          available, so look for suggested alternatives or search for similar
          items
        </p>
      </div>
      {children}
    </div>
  );
}
