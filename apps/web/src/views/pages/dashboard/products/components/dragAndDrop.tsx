// components/DragDropImage.tsx
import { useRef, useState } from 'react';

type Props = {
  onFile: (file: File) => void;
  previewUrl?: string;
};

export default function DragDropImage({ onFile, previewUrl }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (file?: File) => {
    if (!file) return;
    onFile(file);
  };

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragging(false);

        const file = e.dataTransfer.files?.[0];
        handleFile(file);
      }}
      className={`relative w-20 h-20 rounded-lg border-2 flex items-center justify-center cursor-pointer transition
        ${
          isDragging
            ? 'border-orange-500 bg-orange-100/20'
            : 'border-dashed border-gray-400'
        }`}
    >
      {previewUrl ? (
        <img
          src={previewUrl}
          alt="preview"
          className="w-full h-full object-cover rounded-lg"
        />
      ) : (
        <span className="text-xs opacity-60 text-center">Drop or Click</span>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
    </div>
  );
}
