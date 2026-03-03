export default function Loading() {
  return (
    <div className="fixed bg-black/80 h-screen w-screen top-0 bottom-0 left-0 z-50 flex items-center justify-center">
      <div className="flex space-x-2">
        <div className="w-4 h-4 bg-orange-600 rounded-full animate-pulse"></div>
        <div className="w-4 h-4 bg-orange-700 rounded-full animate-pulse delay-150"></div>
        <div className="w-4 h-4 bg-orange-800 rounded-full animate-pulse delay-300"></div>
      </div>
    </div>
  );
}
