'use client';

import React, { useState } from 'react';
import { Star } from 'lucide-react';

interface Props {
  value: number;
  onChange: (rating: number) => void;
}

export function StarRatingInput({ value, onChange }: Props) {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map(star => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          className="cursor-pointer transition-transform hover:scale-110"
        >
          <Star
            size={24}
            className={`transition-colors duration-200
              ${(hovered || value) >= star 
                ? 'fill-[#F5A623] text-[#F5A623]' 
                : 'fill-[#E0E0E0] text-[#E0E0E0]'
              }`}
          />
        </button>
      ))}
    </div>
  );
}
