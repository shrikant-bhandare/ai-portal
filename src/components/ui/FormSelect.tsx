import React from 'react';

interface Option {
  value: string;
  label: string;
}

interface FormSelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'options'> {
  label?: string;
  options: Option[];
}

export function FormSelect({ label, options, className = '', ...props }: FormSelectProps) {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-300 mb-1">
          {label}
        </label>
      )}
      <select
        {...props}
        className={`w-full px-4 py-3 rounded-lg bg-[#1A2737] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 ${className}`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}