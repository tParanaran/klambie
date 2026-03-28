import { IoAlertCircle } from 'react-icons/io5';

interface IButtonForm {
  message: string;
  href: string;
}

export default function ButtonForm({ message, href }: IButtonForm) {
  return (
    <div>
      <button
        type="submit"
        aria-label={href}
        className="bg-orange-800 w-full rounded-full font-semibold uppercase hover:bg-orange-700 py-3 px-4 text-light"
      >
        {href}
      </button>
      {message !== '' ? (
        <div className="flex items-center  my-1 ml-4 text-orange-700 space-x-1">
          {' '}
          <IoAlertCircle /> <p className="text-sm"> {message}</p>
        </div>
      ) : null}
    </div>
  );
}
