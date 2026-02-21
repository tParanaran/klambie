import Link from 'next/link';

const links = [
  {
    href: 'https://www.instagram.com',
    src: 'https://img.icons8.com/?size=50&id=eRJfQw0Zs44S&format=png&color=666666',
    alt: 'Instagram',
  },
  {
    href: 'https://www.facebook.com',
    src: 'https://img.icons8.com/?size=50&id=118468&format=png&color=666666',
    alt: 'Facebook',
  },
  {
    href: 'https://www.youtube.com',
    src: 'https://img.icons8.com/?size=50&id=36908&format=png&color=666666',
    alt: 'Youtube',
  },
];

export default function SocialMediaLink() {
  return (
    <div className="flex justify-center space-x-5 mt-10">
      {links.map((link, idx) => (
        <Link key={idx} href={link.href} target="_blank">
          <img src={link.src} alt={link.alt} width={25} height={25} />
        </Link>
      ))}
    </div>
  );
}
