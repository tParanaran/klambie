export default function TitileContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-11/12 md:w-8/12 text-center mx-auto">
      <h1 className="font-bold text-3xl sm:text-4xl lg:text-5xl md:leading-12">
        {children}
      </h1>
    </div>
  );
}
