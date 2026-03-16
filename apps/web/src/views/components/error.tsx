import { IoWarningOutline } from 'react-icons/io5';

export default function ErrorMessage({ error }: { error: string }) {
  return (
    <main className="w-full mx-auto my-5 text-center">
      <div className="space-y-5 ">
        <div className="text-6xl p-10 rounded-full bg-black/10 dark:bg-white/10 w-fit mx-auto">
          <IoWarningOutline />
        </div>
        <div>
          <h1 className="font-semibold">Woowee! Something went wrong!</h1>
          <p className="mt-3 tet-sm">{error}</p>
        </div>
      </div>
    </main>
  );
}
