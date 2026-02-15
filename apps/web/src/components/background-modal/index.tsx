import { Dispatch, SetStateAction } from 'react';

interface IBackgroundModal {
  setIsModal: Dispatch<SetStateAction<boolean>>;
  classZIndex: string;
  classBackground: string;
}

export default function BackgroundModal(props: IBackgroundModal) {
  const { setIsModal, classZIndex, classBackground } = props;
  return (
    <div className={`fixed h-full w-full top-0 left-0 ${classZIndex}`}>
      <div
        className={`absolute h-full w-full ${classBackground}`}
        onClick={() => setIsModal(false)}
      ></div>
    </div>
  );
}
