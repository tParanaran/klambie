import CheckBox from '@/views/components/checkBox';

interface ISelectAll {
  toggleSelectAll: () => void;
  isSelectedItem: boolean;
}

export default function SelectAllToggle({
  toggleSelectAll,
  isSelectedItem,
}: ISelectAll) {
  return (
    <label>
      {' '}
      <input
        type="checkbox"
        checked={isSelectedItem}
        onChange={toggleSelectAll}
        className="peer hidden"
      />
      <CheckBox isChecked={isSelectedItem} />
    </label>
  );
}
