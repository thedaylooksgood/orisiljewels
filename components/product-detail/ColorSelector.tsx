'use client';

import React from 'react';

interface Props {
  colors: readonly { readonly name: string; readonly hex: string }[];
  selected: string;
  onSelect: (color: string) => void;
}

export function ColorSelector({ colors, selected, onSelect }: Props) {
  return (
    <div className="flex items-center gap-3">
      {colors.map(color => (
        <button
          key={color.name}
          onClick={() => onSelect(color.name)}
          title={color.name}
          className={`w-8 h-8 rounded-full border-2 transition-all duration-300 
            cursor-pointer
            ${selected === color.name 
              ? 'border-[#6D4C4E] scale-110' 
              : 'border-transparent hover:border-[#E0B4B8]'
            }`}
          style={{ backgroundColor: color.hex }}
        />
      ))}
    </div>
  );
}
