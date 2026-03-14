import GoBackButton from './components/goBackButton';
import NavbarTopContainer from '@/views/components/navbarTopContainer';

export default function NavbarCart() {
  return (
    <NavbarTopContainer>
      <div className="flex space-x-3">
        <GoBackButton />
        <h1 className="font-semibold text-lg">Bag</h1>
      </div>
    </NavbarTopContainer>
  );
}
