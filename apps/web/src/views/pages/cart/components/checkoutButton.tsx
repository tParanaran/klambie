'use client';

import Button from '@/views/components/button';

export default function CheckoutButton() {
  const CheckoutHandler = async () => {};

  return (
    <Button
      onClick={() => console.log('Next Feature')}
      disabled={false}
      loading={false}
      className="bg-orange-700"
    >
      Checkout
    </Button>
  );
}
