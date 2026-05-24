'use client';

import { ChangeEvent, useEffect, useRef, useState } from 'react';
import Add from '@/assets/svg/add.svg';
import Close from '@/assets/svg/mdi_close.svg';
import { cn } from '@/helpers/cn';
import Image from 'next/image';
import { uploadFileService } from '@/services/api/uploadAvatarsService';
import Placeholder from '@/assets/image/plaseholder.png';
import { validateFile } from '@/types/validateImage';
import { notifier } from '@/lib/notifier';

interface FileInputProps {
  variant: 'dropzone' | 'avatar' | 'field';
  initialPreviews?: string[];
  onUploadSuccess?: (urls: string[]) => void;
  label?: string;
  multiple?: boolean;
  error?: string;
}

interface LocalFile {
  url: string;
  name: string;
  isDocument: boolean;
}

interface PendingFile {
  blobUrl: string;
  name: string;
}

export const InputFile = ({
  variant,
  initialPreviews = [],
  onUploadSuccess,
  label,
  multiple,
  error,
}: FileInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // avatar / field
  const [localFiles, setLocalFiles] = useState<LocalFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  // dropzone gallery
  const [confirmedUrls, setConfirmedUrls] = useState<string[]>(initialPreviews);
  const confirmedUrlsRef = useRef<string[]>(initialPreviews);
  const [pendingFiles, setPendingFiles] = useState<PendingFile[]>([]);
  const pendingBlobsRef = useRef<string[]>([]);

  const applyConfirmedUrls = (urls: string[]) => {
    confirmedUrlsRef.current = urls;
    setConfirmedUrls(urls);
    onUploadSuccess?.(urls);
  };

  useEffect(() => {
    return () => {
      localFiles.forEach((f) => URL.revokeObjectURL(f.url));
    };
  }, [localFiles]);

  useEffect(() => {
    return () => {
      pendingBlobsRef.current.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  // ─── Dropzone upload ─────────────────────────────────────────────
  const processDropzoneFiles = (files: File[]) => {
    const filesToProcess = multiple ? files : [files[0]];

    Promise.all(filesToProcess.map((f) => validateFile(f)))
      .then(() => {
        const newPending: PendingFile[] = filesToProcess.map((f) => ({
          blobUrl: URL.createObjectURL(f),
          name: f.name,
        }));
        newPending.forEach((p) => pendingBlobsRef.current.push(p.blobUrl));
        setPendingFiles((prev) => [...prev, ...newPending]);
        if (inputRef.current) inputRef.current.value = '';

        const revokePending = () => {
          newPending.forEach((p) => {
            URL.revokeObjectURL(p.blobUrl);
            pendingBlobsRef.current = pendingBlobsRef.current.filter((u) => u !== p.blobUrl);
          });
          setPendingFiles((prev) => prev.filter((p) => !newPending.includes(p)));
        };

        Promise.all(filesToProcess.map((f) => uploadFileService.uploadFileToCloudinary(f)))
          .then((responses) => {
            const newUrls = responses.map((r) => r.secure_url);
            revokePending();
            applyConfirmedUrls([...confirmedUrlsRef.current, ...newUrls]);
          })
          .catch(() => {
            revokePending();
            notifier.error('Помилка завантаження фото');
          });
      })
      .catch(() => {
        notifier.error('Невірний тип або розмір файлу');
        if (inputRef.current) inputRef.current.value = '';
      });
  };

  const handleRemoveConfirmed = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    applyConfirmedUrls(confirmedUrlsRef.current.filter((_, i) => i !== index));
  };

  // ─── Avatar / Field upload ───────────────────────────────────────
  const processLegacyFiles = (filesList: File[]) => {
    if (filesList.length === 0) return;
    const filesToProcess = multiple ? filesList : [filesList[0]];

    Promise.all(filesToProcess.map((file) => validateFile(file)))
      .then(() => {
        setIsUploading(true);
        const newPreviews: LocalFile[] = filesToProcess.map((file) => ({
          url: URL.createObjectURL(file),
          name: file.name,
          isDocument: !file.type.startsWith('image/'),
        }));
        setLocalFiles((prev) => (multiple ? [...prev, ...newPreviews] : newPreviews));

        Promise.all(filesToProcess.map((file) => uploadFileService.uploadFileToCloudinary(file)))
          .then((responses) => {
            onUploadSuccess?.(responses.map((r) => r.secure_url));
          })
          .catch(() => {
            notifier.error('Помилка завантаження');
            resetLegacy();
          })
          .finally(() => {
            setIsUploading(false);
            if (inputRef.current) inputRef.current.value = '';
          });
      })
      .catch(() => {
        notifier.error('Невірний тип або розмір файлу');
        if (inputRef.current) inputRef.current.value = '';
      });
  };

  const resetLegacy = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setLocalFiles([]);
    if (inputRef.current) inputRef.current.value = '';
  };

  // ─── Shared handlers ─────────────────────────────────────────────
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (variant === 'dropzone') {
      processDropzoneFiles(files);
    } else {
      processLegacyFiles(files);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) processDropzoneFiles(files);
  };

  const currentImage = localFiles[0]?.url || initialPreviews?.[0];

  const renderUI = () => {
    if (variant === 'avatar') {
      return (
        <div>
          <div
            onClick={() => inputRef.current?.click()}
            className="border-c-border bg-c-bg group relative flex h-12 w-12 max-w-12 cursor-pointer items-center justify-center overflow-hidden rounded-full border transition-all"
          >
            {currentImage ? (
              <Image
                src={currentImage}
                alt="Avatar"
                fill
                sizes="48px"
                className="h-full w-full object-cover"
                unoptimized
              />
            ) : (
              <span className="text-c-headline text-3xl transition-transform">
                <Add className="text-c-headline" />
              </span>
            )}
          </div>
        </div>
      );
    }

    if (variant === 'field') {
      return (
        <div className="flex w-full flex-col gap-2">
          {label && <label className="text-c-headline text-[13px] font-medium">{label}</label>}
          <div className="flex w-full gap-5">
            <div
              onClick={() => inputRef.current?.click()}
              className="border-c-border bg-c-white flex h-9 w-full cursor-pointer items-center overflow-hidden rounded-md border"
            >
              <div className="bg-c-bg text-c-base border-c-border flex h-full items-center border-r px-3 py-1.75 text-[13px] font-medium whitespace-nowrap">
                Файл
              </div>
              <div className="text-c-headline flex-1 truncate px-3 text-[13px]">
                {initialPreviews?.length > 0 ? 'Збережено' : 'Оберіть файл'}
              </div>
              {initialPreviews?.length > 0 && (
                <button
                  type="button"
                  onClick={resetLegacy}
                  className="text-c-base hover:text-c-danger rotate-45 px-3 transition-colors"
                >
                  <Add className="h-4 w-4" />
                </button>
              )}
            </div>
            <Image
              height={32}
              width={32}
              src={currentImage ? currentImage : Placeholder}
              alt="Logo"
              sizes="38px"
              className="h-9.5 w-9.5 rounded-full object-cover"
            />
          </div>
        </div>
      );
    }

    // ─── Dropzone ─────────────────────────────────────────────────
    return (
      <div className="w-full">
        {label && <p className="text-c-headline mb-2 text-[13px] font-medium">{label}</p>}

        {(confirmedUrls.length > 0 || pendingFiles.length > 0) && (
          <div className="mb-3 grid grid-cols-3 gap-2">
            {confirmedUrls.map((url, i) => (
              <div key={url} className="group relative aspect-[4/3] overflow-hidden rounded-md">
                <Image
                  src={url}
                  alt={`Фото ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 33vw, 200px"
                  className="object-cover"
                  unoptimized
                />
                <button
                  type="button"
                  onClick={(e) => handleRemoveConfirmed(e, i)}
                  className="bg-c-white/80 hover:bg-c-white absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <Close className="text-c-headline h-3 w-3" />
                </button>
              </div>
            ))}

            {pendingFiles.map((f) => (
              <div key={f.blobUrl} className="relative aspect-[4/3] overflow-hidden rounded-md">
                <img src={f.blobUrl} alt={f.name} className="h-full w-full object-cover" />
                <div className="bg-c-headline/40 absolute inset-0 flex items-center justify-center">
                  <div className="border-c-white h-5 w-5 animate-spin rounded-full border-2 border-t-transparent" />
                </div>
              </div>
            ))}
          </div>
        )}

        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            'border-c-border bg-c-white hover:bg-c-bg flex h-[100px] w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed transition-colors',
            isDragging && 'border-c-accent bg-c-accent-light/10',
          )}
        >
          <Add className="text-c-base scale-[1.5]" />
          <p className="text-c-muted text-sm">
            Перетягніть фото або <span className="text-c-accent font-medium">оберіть файли</span>
          </p>
        </div>

        {error && <p className="text-c-error mt-1.5 text-sm">{error}</p>}
      </div>
    );
  };

  return (
    <div>
      <input
        type="file"
        ref={inputRef}
        onChange={handleFileChange}
        className="hidden"
        multiple={multiple}
        accept="image/*"
      />
      {renderUI()}
    </div>
  );
};
