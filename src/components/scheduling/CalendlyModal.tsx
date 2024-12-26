import React from 'react';
import { X } from 'lucide-react';
import { Button } from '../ui/Button';

interface CalendlyModalProps {
  onClose: () => void;
}

export function CalendlyModal({ onClose }: CalendlyModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-brand-dark rounded-xl w-full max-w-4xl h-[80vh] border border-gray-700 flex flex-col">
        <div className="p-6 border-b border-gray-700 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-white">Schedule a Meeting</h2>
          <Button variant="secondary" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="flex-1 w-full bg-white">
          <iframe
            src="https://calendly.com/your-calendly-url"
            width="100%"
            height="100%"
            frameBorder="0"
          />
        </div>
      </div>
    </div>
  );
}