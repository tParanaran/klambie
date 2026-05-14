import AddProductDahsboardView from '@/views/pages/dashboard/products/addProduct';

export default function AddProduct() {
  return (
    <section>
      <AddProductDahsboardView type={'DRAFT'} mode={'CREATE'} />
    </section>
  );
}
