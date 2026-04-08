import TagButton from '@/views/components/tagButton';
import { TbShoppingBagX } from 'react-icons/tb';

export default function DeleteAll({
  deleteAllHandler,
}: {
  deleteAllHandler: () => void;
}) {
  return (
    <TagButton
      className="flex-none"
      onClick={deleteAllHandler}
      aria-label="Delete all unavailable items"
      icon={<TbShoppingBagX className="text-xl" />}
    >
      <p>Delete All</p>
    </TagButton>
  );
}
