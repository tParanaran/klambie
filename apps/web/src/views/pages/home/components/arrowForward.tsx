import { IoArrowForward } from 'react-icons/io5';

export default function ArrowForwarButton() {
  return (
    <>
      <div className="absolute z-10 top-0 right-0 w-9 h-9 bg-body rounded-tr-2xl rounded-bl-2xl inverted-radius-tr"></div>

      <div className="absolute top-0 right-0 z-10 rounded-2xl bg-round-button p-1.5 text-xl">
        <IoArrowForward className="-rotate-35" />
      </div>
    </>
  );
}
