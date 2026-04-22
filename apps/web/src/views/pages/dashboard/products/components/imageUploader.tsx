import { useRef, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useField } from 'formik';
import { IoAdd, IoClose } from 'react-icons/io5';
import { IProductImage } from '../types';
import ErrorForm from '@/views/components/formik/errorForm';

interface IImageUploaderProps {
  attributeValueId?: number;
  isSinglePhoto?: boolean;
}

export default function ImageUploader({
  attributeValueId,
  isSinglePhoto = false,
}: IImageUploaderProps) {
  const [field, , helpers] = useField('images');
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const thumbRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const allImages: IProductImage[] = field.value || [];
  const currentId = attributeValueId ?? 0;

  const images = isSinglePhoto
    ? allImages.filter((img) => img.attributeValueId === currentId)
    : allImages.filter((img) => img.attributeValueId === 0);

  const activeImage = images[activeIndex] || images[0] || null;

  const setImages = (newImages: IProductImage[]) => {
    helpers.setValue(newImages);
    helpers.setTouched(true);
  };

  useEffect(() => {
    if (!thumbRef.current) return;

    thumbRef.current.scrollTo({
      top: thumbRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [images.length]);

  // -------------------------
  // UPLOAD
  // -------------------------
  const onDrop = (files: File[]) => {
    const file = files[0];

    const newImage: IProductImage = {
      url: URL.createObjectURL(file),
      file,
      source: 'LOCAL',
      attributeValueId: currentId,
    };

    let updated = [...allImages];

    if (isSinglePhoto) {
      updated = updated.filter((img) => img.attributeValueId !== currentId);
      updated.push(newImage);
    } else {
      updated.push(newImage);
    }

    setImages(updated);
    setActiveIndex(images.length);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: !isSinglePhoto,
  });

  // -------------------------
  // PASTE URL
  // -------------------------
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const target = e.target as HTMLElement;
      if (['INPUT', 'TEXTAREA'].includes(target.tagName)) return;

      const text = e.clipboardData?.getData('text');
      if (!text || !text.startsWith('http')) return;

      const newImage: IProductImage = {
        url: text,
        source: 'URL',
        attributeValueId: currentId,
      };

      let updated = [...allImages];

      if (isSinglePhoto) {
        updated = updated.filter((img) => img.attributeValueId !== currentId);
      }

      updated.push(newImage);

      setImages(updated);
      setActiveIndex(images.length);
    };

    const el = rootRef.current;
    if (!el) return;

    el.addEventListener('paste', handlePaste);
    return () => el.removeEventListener('paste', handlePaste);
  }, [allImages, currentId, isSinglePhoto, images.length]);

  // -------------------------
  // REMOVE IMAGE
  // -------------------------
  const removeImage = (index?: number) => {
    if (isSinglePhoto) {
      const updated = allImages.filter(
        (img) => img.attributeValueId !== currentId,
      );
      setImages(updated);
      return;
    }

    const updated = allImages.filter((_, i) => i !== index);
    setImages(updated);

    if (activeIndex >= images.length - 1) {
      setActiveIndex(Math.max(0, images.length - 2));
    }
  };

  return (
    <div ref={rootRef}>
      <div
        className={`${!isSinglePhoto ? 'gap-2 w-full flex' : 'w-60 max-w-full mx-auto'}`}
      >
        <div {...getRootProps()} className="flex-1 mt-1.5 ml-1.5">
          <input
            {...getInputProps()}
            tabIndex={attributeValueId ?? 0}
            className="flex-1 mt-1.5 ml-1.5"
          />
          <div
            className={`w-full overflow-hidden rounded-2xl flex items-center justify-center cursor-pointer ${!isSinglePhoto ? 'h-72 md:h-95 lg:h-75' : 'aspect-square'}`}
          >
            {activeImage?.url ? (
              <img
                src={activeImage.url}
                className="object-cover rounded-2xl aspect-square h-full w-full"
              />
            ) : (
              <div className="flex items-center justify-center text-center border-2 border-dashed w-full h-full border-black/10 dark:border-white/10">
                <p className="text-sm px-5">
                  Click or drag and drop to upload image, or paste image URL
                </p>
              </div>
            )}
          </div>
        </div>

        {!isSinglePhoto && (
          <div
            ref={thumbRef}
            className="flex flex-col gap-1 h-72 md:h-95 lg:h-75 overflow-y-scroll scrollbar-hide mt-1.5"
          >
            {images.length > 0 && (
              <div
                {...getRootProps()}
                className={`aspect-square border-2 border-dashed flex items-center justify-center rounded-lg cursor-pointer transition mb-1 border-black/10 dark:border-white/10 ${
                  isDragActive ? 'bg-black/10 dark:bg-white/10' : ''
                }`}
              >
                <input {...getInputProps()} />
                <IoAdd className="text-2xl p-1 bg-emerald-600 rounded-full text-light" />
              </div>
            )}

            {images.map((image, index) => (
              <div key={index} className="relative">
                <button type="button" onClick={() => setActiveIndex(index)}>
                  <img
                    src={image.url}
                    className={`border rounded-lg object-cover aspect-square w-fit max-w-22 ${
                      activeIndex === index
                        ? 'border-black p-1'
                        : 'border-transparent'
                    }`}
                  />
                </button>

                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1/3 right-1/3 bg-red-500 text-white p-1 rounded-full z-20"
                >
                  <IoClose className="text-sm" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <ErrorForm name="images" />
    </div>
  );
}
