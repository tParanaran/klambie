type TabPanelProps = {
  active: boolean;
  children: React.ReactNode;
  direction?: 'left' | 'right';
};

export default function TabPanel({
  active,
  children,
  direction = 'left',
}: TabPanelProps) {
  const hiddenTranslate =
    direction === 'left' ? '-translate-x-2' : 'translate-x-2';

  return (
    <div
      className={`transition-all duration-300 ${
        active
          ? 'opacity-100 translate-x-0 block'
          : `opacity-0 ${hiddenTranslate} pointer-events-none hidden`
      }`}
    >
      {children}
    </div>
  );
}
