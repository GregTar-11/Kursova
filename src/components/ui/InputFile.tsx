'use client';

import { ChangeEvent, useEffect, useRef, useState } from 'react';
import Add from '@/assets/svg/add.svg';
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
}

interface LocalFile {
  url: string;
  name: string;
  isDocument: boolean;
}

export const InputFile = ({
  variant,
  initialPreviews = [],
  onUploadSuccess,
  label,
  multiple,
}: FileInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [localFiles, setLocalFiles] = useState<LocalFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    return () => {
      localFiles.forEach((file) => URL.revokeObjectURL(file.url));
    };
  }, [localFiles]);

  const processFiles = (filesList: File[]) => {
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

        setLocalFiles((prev) =>
          multiple ? [...prev, ...newPreviews] : newPreviews,
        );

        const uploadPromises = filesToProcess.map((file) =>
          uploadFileService.uploadFileToCloudinary(file),
        );

        Promise.all(uploadPromises)
          .then((responses) => {
            const uploadedUrls = responses.map((res) => res.secure_url);
            if (onUploadSuccess) {
              onUploadSuccess(uploadedUrls);
            }
          })
          .catch((err) => {
            notifier.error(err);
            reset();
          })
          .finally(() => {
            setIsUploading(false);
            if (inputRef.current) inputRef.current.value = '';
          });
      })
      .catch((err) => {
        notifier.error(err);
        if (inputRef.current) inputRef.current.value = '';
      });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    processFiles(Array.from(e.target.files || []));
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

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(Array.from(e.dataTransfer.files));
    }
  };

  const renderUI = () => {
    if (variant === 'avatar') {
      return (
        <div
          className={cn(
            isUploading && variant !== 'avatar'
              ? 'pointer-events-none opacity-60'
              : '',
          )}
        >
          <div
            onClick={() => inputRef.current?.click()}
            className="border-c-border bg-c-bg hover:bg-c-divider group relative flex h-12 w-12 max-w-12 cursor-pointer items-center justify-center overflow-hidden rounded-full border transition-all"
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
            {isUploading && <></>}
          </div>
        </div>
      );
    } else if (variant === 'field') {
      return (
        <div className="flex w-full flex-col gap-2">
          {label && (
            <label className="text-c-headline text-[13px] font-medium">
              {label}
            </label>
          )}
          <div className="flex w-full gap-5">
            <div
              onClick={() => inputRef.current?.click()}
              className="border-c-border bg-c-white flex h-9 w-full cursor-pointer items-center overflow-hidden rounded-md border"
            >
              <div className="bg-c-bg text-c-base border-c-border flex h-full items-center border-r px-3 py-1.75 text-[13px] font-medium whitespace-nowrap">
                {"Текст"}
              </div>
              <div className="text-c-headline flex-1 truncate px-3 text-[13px]">
                {initialPreviews?.length > 0
                  ? 'Saved files'
                  : "Текст"}
              </div>
              {initialPreviews?.length > 0 && (
                <button
                  onClick={reset}
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
    } else if (variant === 'dropzone') {
      return (
        <div className="w-full">
          <div
            onClick={() => inputRef.current?.click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={cn(
              'border-c-divider hover:bg-c-bg/50 flex min-h-[120px] w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed bg-white p-6 transition-colors',
              isUploading && 'pointer-events-none opacity-50',
              isDragging && 'border-blue-500 bg-blue-50'
            )}
          >
            <div className="text-c-base mb-3 scale-[1.5]">
              <Add />
            </div>
            <p className="text-c-headline text-[15px] font-medium">
              {isUploading
                ? "Текст"
                : 'Drop files here or click to upload.'}
            </p>
          </div>
          {localFiles.length > 0 && (
            <div className="mt-4 flex flex-col gap-2">
              {localFiles.map((file, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 rounded-md border border-gray-200 bg-gray-50 p-2"
                >
                  {file.isDocument ? (
                    <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-100 text-xs font-bold text-blue-500">
                      DOC
                    </div>
                  ) : (
                    <img
                      src={file.url}
                      alt="preview"
                      className="h-10 w-10 rounded object-cover"
                    />
                  )}
                  <span className="flex-1 truncate text-sm font-medium text-gray-700">
                    {file.name}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }
  };

  const reset = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setLocalFiles([]);
    if (inputRef.current) inputRef.current.value = '';
  };

  const currentImage = localFiles[0]?.url || initialPreviews?.[0];
  return (
    <div className="">
      <input
        type="file"
        ref={inputRef}
        onChange={handleFileChange}
        className="hidden"
        multiple={multiple}
      />
      {renderUI()}
    </div>
  );
};
