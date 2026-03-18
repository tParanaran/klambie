export default function NavbarBottomContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <nav className="fixed md:hidden z-30 bottom-0 left-0 right-0 dark:text-[#ededed] dark:bg-[#1b1a1e]/80 text-black bg-[#ededed]/80 backdrop-blur-xl px-3 sm:px-5 py-4 text-sm">
      {children}
    </nav>
  );
}
