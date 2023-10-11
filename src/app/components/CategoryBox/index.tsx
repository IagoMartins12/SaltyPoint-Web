'use client';

import { CategoryBoxProps } from '@/app/types/ComponentTypes';

const CategoryBox: React.FC<CategoryBoxProps> = ({
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
        p-3
        border-b-2
        hover:text-neutral-400
        transition
        cursor-pointer
        whitespace-nowrap
        ${selected === label ? 'border-b-red-500' : 'border-transparent'}
        `}
      onClick={() => {
        onClick(label);
      }}
    >
      <div className='font-semibold text-sm md:text-base'>{label}</div>
    </div>
  );
};

export default CategoryBox;
