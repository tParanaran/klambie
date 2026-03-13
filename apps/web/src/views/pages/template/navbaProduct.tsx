import ShareButton from '../product/components/shareButton';
import GoBackButton from './components/goBackButton';
import SearchForm from './components/searchBar';
import NavbarTopContainer from '@/views/components/navbarTopContainer';

export default function NavbarProduct() {
  return (
    <NavbarTopContainer>
      <div className="flex justify-between space-x-3">
        <GoBackButton />
        <div className="flex-2">
          <SearchForm />
        </div>
        <ShareButton />
      </div>
    </NavbarTopContainer>
  );
}
