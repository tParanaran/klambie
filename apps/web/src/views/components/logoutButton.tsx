'use client';
import { useRouter } from 'next/navigation';
import { IoPower } from 'react-icons/io5';

export default function LogoutButton({ className }: { className: string }) {
  const redirect = useRouter();
  const LogoutHandler = async () => {};

  return (
    <button className={className} onClick={LogoutHandler} aria-label="Logout">
      <IoPower className="mr-2 text-lg" /> Log out
    </button>
  );
}
