'use client';

import Button from '@/views/components/button';
import { ITotalPrice } from '../types';

export default function CheckoutButton({
  totalPrice,
}: {
  totalPrice: ITotalPrice | null;
}) {
  const CheckoutHandler = async () => {};

  return (
    <Button
      onClick={() => console.log('Next Feature')}
      disabled={totalPrice === null}
      className="bg-orange-800"
    >
      Checkout
    </Button>
  );
}
