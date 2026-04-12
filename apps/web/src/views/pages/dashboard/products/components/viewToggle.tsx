import { IoGrid, IoList } from 'react-icons/io5';
import ToggleButton from './toggleButton';

type ViewMode = 'CARD' | 'TABLE';

export default function ViewToggle({
  view,
  setView,
}: {
  view: ViewMode;
  setView: (v: ViewMode) => void;
}) {
  const viewOptions = [
    {
      label: 'Card',
      Icon: IoGrid,
      setToogle: () => setView('CARD'),
      isToggle: view === 'CARD',
    },
    {
      label: 'Table',
      Icon: IoList,
      setToogle: () => setView('TABLE'),
      isToggle: view === 'TABLE',
      style: 'bg-black/10! dark:bg-white!',
    },
  ];
  return (
    <div
      className={`flex items-center dark:bg-white/10 rounded-lg p-1 w-fit shadow-sm ${view === 'TABLE' ? 'bg-black/10' : 'bg-light'}`}
    >
      {viewOptions.map((opt, o) => (
        <ToggleButton
          key={o}
          setToggle={() => opt.setToogle()}
          Icon={opt.Icon}
          isToggle={opt.isToggle}
          label={opt.label}
          style={opt.style}
        />
      ))}
    </div>
  );
}
