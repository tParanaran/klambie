const desktopPattern = [
  {
    className: 'row-span-2 bg-green-700 rounded-t-full rounded-bl-full',
    inner: true,
  },
  { className: 'bg-active rounded-t-full rounded-bl-full' },
  { className: 'bg-red-800 rounded-t-full rounded-br-full' },
  { className: 'bg-active rounded-tl-full rounded-b-full' },
  {
    className:
      'row-span-2 bg-red-800 rounded-tr-full rounded-b-full flex items-end',
    innerAlt: true,
  },
  {
    className: 'col-span-2 bg-green-700 rounded-t-full rounded-bl-full',
    inner: true,
  },
  { className: 'bg-red-800 rounded-t-full rounded-bl-full' },
  { className: 'bg-active rounded-t-full rounded-br-full' },
  {
    className:
      'row-span-2 bg-green-700 rounded-tr-full rounded-b-full flex items-end',
    inner: true,
  },
  { className: 'bg-red-800 rounded-b-full rounded-tl-full' },
  { className: 'bg-active rounded-b-full rounded-tr-full' },
];

export default function AboutPattern() {
  return (
    <div
      className={`hidden md:grid md:grid-cols-3 md:auto-cols-[98px] md:auto-rows-[98px] gap-1 mt-5`}
    >
      {desktopPattern.map((item, i) => (
        <div key={i} className={`relative ${item.className}`}>
          {item.inner && (
            <div className="w-24.5 h-24.5 rounded-full dark:bg-green-200 bg-yellow-500 "></div>
          )}

          {item.innerAlt && (
            <div className="w-24.5 h-24.5 rounded-br-full rounded-t-full dark:bg-green-200 bg-yellow-500 "></div>
          )}
        </div>
      ))}
    </div>
  );
}
