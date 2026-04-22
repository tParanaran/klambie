'use client';
import { IoCaretDown } from 'react-icons/io5';
import TagButton from '@/views/components/tagButton';
import { useState } from 'react';
import useActions from '../hooks/useActions';
import DeleteModal from './deleteModal';

interface IActions {
  toggleVariants: () => void;
  slug: string;
  name: string;
  hasVariants: boolean;
  id: number;
  isOpen: boolean;
  variantsLength: number;
}

const className = 'flex-none bg-black/15! dark:bg-white/10! text-dark';

export default function Actions({
  toggleVariants,
  slug,
  id,
  name,
  isOpen,
  variantsLength,
  hasVariants,
}: IActions) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const { router } = useActions(id);

  return (
    <>
      <div className="w-full flex mb-2 space-x-1 justify-start">
        {variantsLength > 0 && hasVariants && (
          <TagButton
            className={className}
            onClick={() => toggleVariants()}
            icon={
              <IoCaretDown
                className={`text-xl transition-transform duration-300 text-orange-700 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
              />
            }
          >
            <span>
              <p>{variantsLength}</p>
            </span>
          </TagButton>
        )}

        <TagButton className={className} onClick={() => setShowModal(true)}>
          <p>Delete</p>
        </TagButton>

        <TagButton
          className={className}
          onClick={() => router.push(`/dashboard/products/${id}`)}
        >
          <p>Edit</p>
        </TagButton>

        <TagButton className={className} href={`/p/${slug}`}>
          <p>View</p>
        </TagButton>
      </div>

      <DeleteModal
        showModal={showModal}
        id={id}
        name={name}
        closeModal={() => setShowModal(false)}
        modalHandler={() => setShowModal(!showModal)}
      />
    </>
  );
}
