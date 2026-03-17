import { ICategories } from '../types';

export default function SideNavbar({ filters }: { filters: ICategories[] }) {
  const container = 'p-3 bg-black/5 dark:bg-white/10 rounded-2xl shadow-xs';
  const header = 'font-semibold';

  return (
    <aside className="w-xs mb-5">
      <nav className="sticky top-24 max-h-[calc(100vh-5rem)] overflow-y-auto space-y-3">
        <div className={container}>
          <h1 className={header}>Brand</h1>
        </div>
        <div className={container}>
          <h1 className={header}>Category</h1>
          {filters?.map((cat, c) => (
            <div key={c}>
              <p>{cat.name}</p>
              {cat.subcategories?.map((sub, s) => (
                <p key={s}>{sub.name}</p>
                
              ))}
            </div>
          ))}
        </div>
      </nav>
    </aside>
  );
}
