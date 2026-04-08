import { useCartQuery } from '../p/hooks/useCartQuery';
import GoBackButton from './components/goBackButton';
import NavbarTopContainer from '@/views/components/navbarTopContainer';
import NavbarDepartment from './navbarDepartment';

export default function NavbarCart() {
  const total = useCartQuery();
  return (
    <>
      <NavbarTopContainer>
        <div className="flex space-x-3 py-2">
          <GoBackButton />
          <h1 className="font-semibold text-lg">My Bag ({total ?? 0})</h1>
        </div>
      </NavbarTopContainer>
      <NavbarDepartment />
    </>
  );
}
