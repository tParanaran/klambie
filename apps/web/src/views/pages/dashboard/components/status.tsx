export default function Status({ status }: { status: string }) {
  return (
    <p
      className={`w-fit mx-auto px-2 py-1 rounded-full text-xs ${status === 'ACTIVE' ? 'text-red-700 bg-red-700/20' : status === 'ARCHIVE' ? 'text-yellow-700 bg-yellow-600/20' : 'text-gray-500 bg-gray-500/20'}`}
    >
      {status}
    </p>
  );
}
