import React from 'react';
import { X } from 'lucide-react';
import { Button } from '../ui/Button';
import { SchedulingForm } from './SchedulingForm';
import { ModalHeader } from '../ui/ModalHeader';

interface SchedulingModalProps {
  onClose: () => void;
}

export function SchedulingModal({ onClose }: SchedulingModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-brand-dark rounded-xl w-full max-w-2xl border border-gray-700 flex flex-col max-h-[90vh]">
        <ModalHeader title="Schedule a Meeting" onClose={onClose} />
        <div className="p-6 overflow-y-auto modal-content">
          <SchedulingForm onSuccess={onClose} />
        </div>
      </div>
    </div>
  );
}