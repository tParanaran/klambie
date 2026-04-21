import { useRef, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useField } from 'formik';
import { IoAdd, IoClose } from 'react-icons/io5';
import ErrorForm from '@/views/components/formik/errorForm';
import { IProductImage } from '../types';

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
  const allImages: IProductImage[] = field.value || [];

  const images = attributeValueId
    ? allImages.filter(
        (img) => Number(img.attributeValueId) === attributeValueId,
      )
    : allImages.filter((img) => img.attributeValueId === 0);

  useEffect(() => {
    if (!thumbRef.current) return;

    thumbRef.current.scrollTo({
      top: thumbRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [images.length]);

  const activeImage =
    images.length > 0
      ? (images[activeIndex] ?? images[images.length - 1])
      : null;

  const setImages = (newImages: any[]) => {
    helpers.setValue(newImages);
    helpers.setTouched(true);
    setActiveIndex(newImages.length - 1);
  };

  const onDrop = (files: File[]) => {
    let updatedImages = [...images];

    files.forEach((file) => {
      const newImage: IProductImage = {
        url: URL.createObjectURL(file),
        file,
        source: 'local',
        attributeValueId: attributeValueId ?? 0,
      };

      if (isSinglePhoto) {
        updatedImages = [newImage];
        return;
      }

      if (attributeValueId) {
        const existingIndex = updatedImages.findIndex(
          (img) => img.attributeValueId === attributeValueId,
        );

        if (existingIndex !== -1) {
          updatedImages[existingIndex] = newImage;
          return;
        }
      }

      updatedImages.push(newImage);
    });

    setImages(updatedImages);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: true,
  });

  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const target = e.target as HTMLElement;

      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        return;
      }
      const text = e.clipboardData?.getData('text');

      if (text && text.startsWith('http')) {
        const newImage: IProductImage = {
          url: text,
          source: 'url',
          attributeValueId: attributeValueId ?? 0,
        };

        let updatedImages = [...images];

        if (isSinglePhoto) {
          updatedImages = [newImage];
        } else if (attributeValueId) {
          const existingIndex = updatedImages.findIndex(
            (img) => img.attributeValueId === attributeValueId,
          );

          if (existingIndex !== -1) {
            updatedImages[existingIndex] = newImage;
          } else {
            updatedImages.push(newImage);
          }
        } else {
          updatedImages.push(newImage);
        }

        setImages(updatedImages);
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [images]);

  const removeImage = (index: number) => {
    const updated = [...images];
    updated.splice(index, 1);

    helpers.setValue(updated);

    if (updated.length === 0) {
      setActiveIndex(0);
      return;
    }

    if (activeIndex >= updated.length) {
      setActiveIndex(updated.length - 1);
    }
  };

  return (
    <div>
      <div className={`w-full flex ${!isSinglePhoto ? 'gap-2' : ''}`}>
        <div {...getRootProps()} className="flex-1 mt-1.5 ml-1.5">
          <input {...getInputProps()} />
          <div className="w-full h-72 md:h-95 lg:h-75 overflow-hidden rounded-2xl flex items-center justify-center cursor-pointer">
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
                className={`aspect-square border-2 border-black/10 dark:border-white/10 border-dashed flex items-center justify-center rounded-lg cursor-pointer transition mb-1 ${
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
                  className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"
                >
                  <IoClose className="text-sm" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>{' '}
      <ErrorForm name="images" />
    </div>
  );
}
