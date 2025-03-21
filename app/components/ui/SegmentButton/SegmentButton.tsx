import React from 'react';

interface SegmentButtonProps {
  options: { value: string; label: string }[];
  selectedValue: string;
  onChange: (value: string) => void;
}

const SegmentButton: React.FC<SegmentButtonProps> = ({ options, selectedValue, onChange }) => {
  return (
    <div className="flex p-1 bg-gray-100 rounded-lg mb-4">
      {options.map(option => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`flex-1 px-4 py-2 rounded-lg cursor-pointer text-sm font-medium ${
            selectedValue === option.value ? 'bg-blue-500 text-white' : 'text-gray-500 hover:bg-gray-200'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default SegmentButton;
