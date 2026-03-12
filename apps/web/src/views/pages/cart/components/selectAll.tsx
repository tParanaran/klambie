interface ISelectAll {
  toggleSelectAll: () => void;
  isSelectedItem: boolean;
}

export default function SelectAllToggle({
  toggleSelectAll,
  isSelectedItem,
}: ISelectAll) {
  return (
    <input
      type="checkbox"
      checked={isSelectedItem}
      onChange={toggleSelectAll}
      className="w-5 h-5 appearance-none rounded-2xl border 
              hover:ring hover:ring-black/90 hover:ring-offset-1 hover:ring-offset-slate-100 checked:ring-1 checked:ring-black/90 checked:ring-offset-2 checked:ring-offset-slate-100
             cursor-pointer bg-gray-100"
    />
  );
}
