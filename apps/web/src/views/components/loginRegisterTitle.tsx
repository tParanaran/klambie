import Image from 'next/image';

export default function LoginRegisterTitle({ title }: { title: string }) {
  return (
    <div className="md:px-5 lg:px-10">
      <Image
        src={'/icon.svg'}
        alt={'Klambie icon'}
        width={50}
        height={50}
        className="w-10 sm:w-14"
      />
      <div>
        <h1 className="text-2xl sm:text-4xl font-semibold">{title}</h1>
        <p className="md:pb-5 text-sm opacity-50 sm:mt-3 overflow-hidden">
          Welcome to Klambie - Let's get started
        </p>
      </div>
    </div>
  );
}
