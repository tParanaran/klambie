import { useState } from 'react';
import ShareButton from '../product/components/shareButton';
import GoBackButton from './components/goBackButton';
import NavbarTopContainer from '@/views/components/navbarTopContainer';
import useHandleClickOutside from './hooks/useHandleClickOutside';

import SearchBar from './components/searchBar';
import SearchRecent from './components/searchRecent';

export default function NavbarProduct() {
  const [dropdown, setDropdown] = useState<boolean>(false);
  const handleClickOutside = () => {
    setDropdown(false);
  };

  const { dropdownRef, modalRef } = useHandleClickOutside({
    handleClickOutside,
  });
  return (
    <NavbarTopContainer>
      <div className="flex justify-between space-x-3">
        <GoBackButton />
        <div
          className="flex-2"
          ref={modalRef}
          onFocus={() => setDropdown(true)}
        >
          <SearchBar />
        </div>
        <ShareButton />
      </div>
      {dropdown && (
        <div ref={dropdownRef}>
          <SearchRecent />
        </div>
      )}
    </NavbarTopContainer>
  );
}
