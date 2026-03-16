import ProductCard from './components/card';
import SideNavbar from './components/sideNavbar';

export default function CategoryView() {
  return (
    <div>
      <SideNavbar />
      <div>
        <ProductCard products={[]} />
      </div>
    </div>
  );
}
