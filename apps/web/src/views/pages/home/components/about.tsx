import TitileContainer from '@/views/components/titleContainer';

export default function About() {
  return (
    <div className="my-10 lg:my-15 grid grid-cols-1 md:grid-cols-3">
      <div></div>
      <div className="md:col-span-2">
        <TitileContainer
          badge={'About Us'}
          title={'Built From Real Identity Backed By Real'}
          spanTitle="Brands and Creations"
          isFull={true}
        />
        <p className="opacity-50 my-10 lg:py-15 p-3 text-justify">
          Klambie blends handpicked products from established brands with our
          own original collections. We bring together the best of both worlds —
          carefully selected pieces from trusted brands and our own original
          designs. We focus on quality, timeless design, and a seamless shopping
          experience. We are more than just a store. We curate standout products
          from brands we believe in, while also building our own line of designs
          crafted for real people. Every item is chosen with purpose — to
          inspire your everyday style. We curate what’s worth wearing and create
          what’s missing, so you can express yourself with confidence. From
          selected brands to our own label, everything we offer is driven by
          style, culture, and authenticity.
        </p>
      </div>
    </div>
  );
}
