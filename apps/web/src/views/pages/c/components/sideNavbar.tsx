import { IFilters } from '../types';

export default function SideNavbar({ filters }: { filters: IFilters[] }) {
  const container = 'p-3 bg-black/5 dark:bg-white/10 rounded-lg shadow-xs';
  const header = 'font-semibold';

  return (
    <aside className="w-2xs mb-5">
      <nav className="sticky top-24 max-h-[calc(100vh-5rem)] overflow-y-auto space-y-3">
        <div className={container}>
          <h1 className={header}>Brand</h1>
        </div>
        <div className={container}>
          <h1 className={header}>Category</h1>
          {filters?.map((filter, f) => (
            <p key={f}>{filter.category.name}</p>
          ))}
        </div>
      </nav>
    </aside>
  );
}
