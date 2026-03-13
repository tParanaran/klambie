import NavbarContainer from '@/views/components/navbarTopContainer';
import GoBackButton from './components/goBackButton';

export default function NavbarCart() {
  return (
    <NavbarContainer>
      <div className="flex space-x-3">
        <GoBackButton />
        <h1 className="font-semibold text-lg">Bag</h1>
      </div>
    </NavbarContainer>
  );
}
