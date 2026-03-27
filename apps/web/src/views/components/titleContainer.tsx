export default function TitileContainer({
  badge,
  title,
  spanTitle,
}: {
  badge: string;
  title: string;
  spanTitle?: string;
}) {
  return (
    <div className="w-11/12 md:w-8/12 text-center mx-auto">
      <div className="font-bold text-3xl sm:text-4xl lg:text-5xl md:leading-12">
        <h1 className="text-sm sm:text-base uppercase font-semibold text-badge leading-8 text-orange-700">
          {badge}
        </h1>
        <h1>
          {title}
          {spanTitle && (
            <span className="text-orange-800 dark:text-orange-700 ml-3">
              {spanTitle}
            </span>
          )}
        </h1>
      </div>
    </div>
  );
}
