'use client';

import React from 'react';

interface Props {
  sizes: readonly string[];
  selected: string;
  onSelect: (size: string) => void;
}

export function SizeSelector({ sizes, selected, onSelect }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {sizes.map(size => (
        <button
          key={size}
          onClick={() => onSelect(size)}
          className={`min-w-[44px] h-10 px-4 rounded-lg text-sm font-semibold 
            transition-all duration-300 cursor-pointer border
            ${selected === size 
              ? 'bg-[#6D4C4E] text-white border-[#6D4C4E]' 
              : 'bg-white text-[#333333] border-[rgba(224,180,184,0.5)] hover:border-[#C17F78]'
            }`}
        >
          {size}
        </button>
      ))}
    </div>
  );
}
