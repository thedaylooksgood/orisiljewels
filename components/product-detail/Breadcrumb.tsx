import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;     // if undefined, it's the current page (no link)
}

interface Props {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: Props) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-[#9E9E9E] font-inter">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <ChevronRight size={14} className="text-[#9E9E9E]" />
          )}
          {item.href ? (
            <Link
              href={item.href}
              className="hover:text-[#C17F78] transition-colors duration-300"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-[#6D4C4E] font-medium truncate max-w-[200px]">
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
