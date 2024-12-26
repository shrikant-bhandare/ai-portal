import React from 'react';
import { X } from 'lucide-react';
import { Button } from './Button';

interface ModalHeaderProps {
  title: string;
  onClose: () => void;
}

export function ModalHeader({ title, onClose }: ModalHeaderProps) {
  return (
    <div className="p-6 border-b border-gray-700 flex items-center justify-between sticky top-0 bg-brand-dark z-10">
      <h2 className="text-2xl font-semibold text-white">{title}</h2>
      <Button variant="secondary" onClick={onClose}>
        <X className="h-5 w-5" />
      </Button>
    </div>
  );
}