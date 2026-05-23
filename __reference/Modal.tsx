'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/helpers/cn';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export const Modal = ({ isOpen, onClose, children, className }: ModalProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (e: KeyboardEvent) => e.key === 'Escape' && onClose();

    // document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleEsc);

    return () => {
      // document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9990] flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* <div
        className={cn(
          'relative z-10 w-full max-w-120 rounded-2xl bg-white p-6 shadow-2xl',
          className,
        )}
      > */}
        {children}
      {/* </div> */}
    </div>,
    document.getElementById('modal')!,
  );
};
