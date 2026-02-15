import Link from 'next/link';
import Image from 'next/image';
import { MdCopyright } from 'react-icons/md';
import { Anton } from 'next/font/google';

export const antonFont = Anton({
  weight: ['400'],
  subsets: ['latin'],
});

export default function Footer() {
  return (
    <div className="bg-black">
      <div className="flex items-center flex-col">
        <div className="w-screen lg:max-w-7xl">
          <footer className="bg-black/90 px-3 sm:px-10 py-[10%] text-[#ededed] grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <div>
                <div className="flex space-x-1 text-2xl sm:text-3xl items-center">
                  <Link href={'/'}>
                    <Image
                      loading="lazy"
                      src={'/icon.svg'}
                      alt={'Klambie icon'}
                      width={25}
                      height={25}
                      className="w-7 sm:w-8 h-auto"
                    />
                  </Link>

                  <Link href={'/'}>
                    <h1
                      className={`font-extrabold uppercase ${antonFont.className}`}
                    >
                      Klambie
                    </h1>
                  </Link>
                </div>

                <p className="font-light text-xs uppercase">
                  Real Designs By Real Artists For Real People
                </p>
              </div>
              <div className="text-sm font-light opacity-50 mt-5">
                <p>
                  Jl. C. Simanjuntak, Terban,
                  <br />
                  Kec. Gondokusuman, Kota Yogyakarta,
                  <br />
                  Daerah Istimewa Yogyakarta 55223
                </p>
              </div>
              <div className="flex mt-5 space-x-10 text-sm font-light flex-wrap">
                <div className="mt-5">
                  <h1 className="opacity-50 mb-3">Phone Number</h1>
                  <a href="tel:622741234" target="_blank" aria-label="Phone to">
                    <p>0274-1234-567</p>
                  </a>
                </div>
                <div className="mt-5">
                  <h1 className="opacity-50 mb-3">Email</h1>
                  <a href="mailto:" target="_blank" aria-label="Email to">
                    <p>support@ klambie.com</p>
                  </a>
                </div>
              </div>
            </div>
            <div className="flex lg:justify-end space-x-4 sm:space-x-20 md:space-x-10 lg:space-x-24 font-light text-sm flex-wrap">
              <div className="flex flex-col space-y-5 mt-5">
                <h1 className="opacity-50">Quick Links</h1>
                <Link href="/shop">Shop</Link>
                <Link href="/about">About us</Link>
                <Link href="/question">FAQ</Link>
                <Link href="/contact">Contact us</Link>
              </div>
              <div className="flex flex-col space-y-5 mt-5">
                <h1 className="opacity-50">Social</h1>
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  aria-label="Facebook"
                >
                  Facebook
                </a>
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  aria-label="Instagram"
                >
                  Instagram
                </a>
                <a
                  href="https://www.youtube.com/"
                  target="_blank"
                  aria-label="Youtube"
                >
                  Youtube
                </a>
                <a
                  href="https://www.twitter.com/"
                  target="_blank"
                  aria-label="Twitter"
                >
                  Linkedin
                </a>
              </div>
              <div className="flex flex-col space-y-5 mt-5">
                <h1 className="opacity-50">Legal</h1>
                <Link href="/">Term of service</Link>
                <Link href="/">Privacy policy</Link>
                <Link href="/">Cookie policy</Link>
              </div>
            </div>
          </footer>
          <footer className="bg-black/90 py-2 px-[5%]">
            <div className="flex items-center  justify-center text-[#ededed] opacity-50 text-sm font-light text-center">
              {' '}
              <MdCopyright />
              <p>2025 Klambie. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
