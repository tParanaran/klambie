import { sidebarItems } from '@/utils/dashboard';
import LogoutButton from '../../template/components/logoutButton';
import Image from 'next/image';
import Link from 'next/link';

export default function SideNavbar() {
  return (
    <nav className="sticky p-3 top-0 flex flex-col justify-between items-center h-screen min-h-[50vh] overflow-y-auto scrollbar-hide space-y-3">
      <Link href={'/'}>
        <Image
          loading="lazy"
          src={'/icon.svg'}
          alt={'Klambie icon'}
          width={25}
          height={25}
          className="w-10 sm:w-14 h-auto"
        />
      </Link>
      <div>
        {sidebarItems.map((item, i) => (
          <Link
            key={i}
            href={item.path}
            className={`transition-colors duration-200 hover:text-orange-700 text-hover-light p-1`}
            aria-controls={item.title}
          >
            <div className="text-xs px-1 flex flex-col items-center w-full">
              {item.Icon && <item.Icon className="text-2xl hover:scale-125" />}
              <p> {item.title}</p>
            </div>
          </Link>
        ))}
      </div>
      <div>
        <LogoutButton
          iconClass={'text-xl mx-auto'}
          name="Log Out"
          className="text-xs text-active"
        />
      </div>
    </nav>
  );
}
