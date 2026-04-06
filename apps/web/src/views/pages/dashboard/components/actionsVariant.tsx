import { useState } from 'react';
import { TbHttpDelete, TbHttpPatch } from 'react-icons/tb';
import DeleteModal from './deleteModal';

interface IActionsVariant {
  id: number;
  name: string;
}

export default function ActionsVariant({ id, name }: IActionsVariant) {
  const [showModal, setShowModal] = useState<boolean>(false);
  return (
    <>
      <div className="flex sm:space-x-1 text-light flex-col sm:flex-row">
        <button
          className="bg-red-800 rounded-full p-1.5 my-0.5"
          onClick={() => setShowModal(true)}
        >
          <TbHttpDelete className="text-xl" />
        </button>
        <button className="bg-green-700 rounded-full p-1.5 my-0.5">
          <TbHttpPatch className="text-xl" />
        </button>
      </div>
      <DeleteModal
        showModal={showModal}
        setShowModal={setShowModal}
        id={id}
        isVariant={true}
        name={name}
      />
    </>
  );
}
