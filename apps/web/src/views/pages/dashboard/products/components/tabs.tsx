export type TabType = 'GENERAL' | 'DETAILS' | 'VARIANTS';

interface TabsProps {
  tab: TabType;
  setTab: (tab: TabType) => void;
  hasVariants?: boolean;
}

const tabsOptions: { name: string; type: TabType }[] = [
  { name: 'General', type: 'GENERAL' },
  { name: 'Details', type: 'DETAILS' },
  { name: 'Variants', type: 'VARIANTS' },
];

export default function Tabs({ tab, setTab, hasVariants }: TabsProps) {
  return (
    <div className="flex border-black/10 dark:border-white/10 border-b-[0.5px]">
      {tabsOptions.map((opt) => {
        const isDisabled = opt.type === 'VARIANTS' && !hasVariants;

        return (
          <button
            key={opt.name}
            type="button"
            disabled={isDisabled}
            onClick={() => setTab(opt.type)}
            className={`px-4 py-2 text-sm border-b-2 ${
              tab === opt.type
                ? 'border-orange-700 font-medium'
                : 'border-transparent opacity-50'
            }  ${isDisabled ? 'cursor-not-allowed opacity-30' : ''}`}
          >
            {opt.name}
          </button>
        );
      })}
    </div>
  );
}
