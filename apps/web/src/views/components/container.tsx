export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center flex-col">
      <div className="w-screen lg:max-w-7xl  px-3 sm:px-5 lg:px-8">
        {children}
      </div>
    </div>
  );
}
