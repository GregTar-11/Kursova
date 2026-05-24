'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/helpers/cn';

interface PhotoGalleryProps {
  images: string[];
  alt: string;
}

export function PhotoGallery({ images, alt }: PhotoGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (images.length === 0) return null;

  return (
    <div className="w-full">
      <div className="bg-c-border relative aspect-[16/6] w-full overflow-hidden">
        <Image
          src={images[selectedIndex]}
          alt={`${alt} — фото ${selectedIndex + 1}`}
          fill
          priority
          sizes="100vw"
          className="object-cover transition-opacity duration-200"
          unoptimized
        />
      </div>

      {images.length > 1 && (
        <div className="mx-auto max-w-7xl overflow-x-auto px-4 md:px-8">
          <div className="mt-2 flex gap-2 pb-2">
            {images.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => setSelectedIndex(i)}
                className={cn(
                  'relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-md border-2 transition-colors',
                  i === selectedIndex
                    ? 'border-c-accent'
                    : 'border-c-border hover:border-c-accent-light',
                )}
              >
                <Image
                  src={src}
                  alt={`${alt} мініатюра ${i + 1}`}
                  fill
                  sizes="96px"
                  className="object-cover"
                  unoptimized
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
