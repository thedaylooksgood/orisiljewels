'use client';

import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface Props {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export function QuantitySelector({ value, onChange, min = 1, max = 99 }: Props) {
  return (
    <div className="flex items-center border border-[rgba(224,180,184,0.5)] 
      rounded-lg overflow-hidden w-fit">
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className="w-10 h-10 flex items-center justify-center text-[#6D4C4E] 
          hover:bg-[#F3E3E4] transition-colors disabled:opacity-30 cursor-pointer 
          disabled:cursor-not-allowed"
      >
        <Minus size={16} />
      </button>
      <span className="w-10 h-10 flex items-center justify-center text-sm 
        font-semibold text-[#333333] border-x border-[rgba(224,180,184,0.5)]">
        {value}
      </span>
      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className="w-10 h-10 flex items-center justify-center text-[#6D4C4E] 
          hover:bg-[#F3E3E4] transition-colors disabled:opacity-30 cursor-pointer 
          disabled:cursor-not-allowed"
      >
        <Plus size={16} />
      </button>
    </div>
  );
}
