export default function NavbarBottomContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <nav className="fixed md:hidden z-40 bottom-0 left-0 right-0 text-secondary bg-secondary-opacity backdrop-blur-xl px-3 sm:px-5 py-4 text-sm">
      {children}
    </nav>
  );
}
