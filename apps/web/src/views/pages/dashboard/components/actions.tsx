import { actionOptions } from '@/utils/productDashboard';
import TagButton from '@/views/components/tagButton';
import { IoCaretDown } from 'react-icons/io5';

interface IActions {
  toggleVariants: () => void;
  isOpen: boolean;
  variantsLength: number;
}

export default function Actions({
  toggleVariants,
  isOpen,
  variantsLength,
}: IActions) {
  return (
    <div className="w-full flex mb-2 space-x-1 justify-start ">
      {variantsLength > 0 && (
        <TagButton
          className="flex-none"
          onClick={() => toggleVariants()}
          icon={
            <IoCaretDown
              className={`text-xl transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
            />
          }
        >
          <span>
            <p>{variantsLength} Variants</p>
          </span>
        </TagButton>
      )}
      {actionOptions.map((action) => (
        <TagButton
          key={action.label}
          className="flex-none"
          {...(action.href && { href: action.href })}
          {...(action.onClick && { onClick: action.onClick })}
        >
          {action.label}
        </TagButton>
      ))}
    </div>
  );
}
