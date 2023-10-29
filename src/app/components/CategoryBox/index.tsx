'use client';

import { CategoryBoxProps } from '@/app/types/ComponentTypes';

export const CategoryBox: React.FC<CategoryBoxProps> = ({
  label,
  selected,
  onClick,
}) => {
  return (
    <div
      className={`
        flex
        flex-col
        items-center
        justify-center
        gap-2
        px-4 py-2
        hover:text-neutral-400
        transition
        cursor-pointer
        whitespace-nowrap
        border-2
        rounded-3xl
        border-red-500
        ${selected === label ? 'bg-red-500' : ''}
        `}
      onClick={() => {
        onClick(label);
      }}
    >
      <div
        className={`font-medium text-sm md:text-base ${
          selected === label ? 'text-white' : 'text-red-500'
        }`}
      >
        {label}
      </div>
    </div>
  );
};
