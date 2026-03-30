const mobilePattern = [
  { className: 'bg-red-800 rounded-t-full rounded-bl-full' },
  { className: 'bg-red-800 rounded-t-full rounded-br-full' },
  {
    className: 'row-span-2 bg-green-700 rounded-t-full rounded-br-full',
    innerAbs: true,
  },
  {
    className: 'col-span-2 bg-green-700 rounded-t-full rounded-br-full',
    innerRight: true,
  },
  { className: 'bg-active rounded-tl-full rounded-b-full' },
  { className: 'bg-active rounded-b-full rounded-tr-full' },
  { className: 'bg-active rounded-t-full rounded-bl-full' },
  { className: 'bg-active rounded-t-full rounded-br-full' },
  {
    className: 'col-span-2 bg-green-700 rounded-tl-full rounded-b-full',
    innerLeft: true,
  },
  {
    className: 'col-span-2 bg-red-800 rounded-tl-full rounded-b-full',
    innerMix: true,
  },
  { className: 'bg-red-800 rounded-b-full rounded-tr-full' },
];

export default function AboutPatternMobile() {
  return (
    <div className="grid md:hidden grid-cols-5 sm:grid-cols-[repeat(5,98px)] auto-rows-[76px] sm:auto-rows-[98px] gap-1 max-w-full w-90 sm:w-130 mt-10 overflow-hidden mx-auto">
      {mobilePattern.map((item, i) => (
        <div key={i} className={`relative overflow-hidden ${item.className}`}>
          {item.innerAbs && (
            <div className="absolute w-24.5 h-24.5 rounded-full bg-yellow-500 dark:bg-green-200"></div>
          )}

          {item.innerRight && (
            <div className="absolute right-0 w-19 h-19 sm:w-24.5 sm:h-24.5 rounded-full bg-yellow-500 dark:bg-green-200"></div>
          )}

          {item.innerLeft && (
            <div className="absolute left-0 w-19 h-19 sm:w-24.5 sm:h-24.5 rounded-full bg-yellow-500 dark:bg-green-200"></div>
          )}

          {item.innerMix && (
            <div className="absolute left-0 w-19 h-19 sm:w-24.5 sm:h-24.5 rounded-tr-full rounded-b-full bg-yellow-500 dark:bg-green-200"></div>
          )}
        </div>
      ))}
    </div>
  );
}
