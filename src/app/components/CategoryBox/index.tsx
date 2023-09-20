'use client';

import { CategoryBoxProps } from '@/app/types/ComponentTypes';

// type CategoryName = 'Pizza' | 'Esfiha' | 'Promoções' | 'Bebidas' | 'Combos';
// const SetIcon = (categoryName: CategoryName) => {
//   let icon;
//   switch (categoryName) {
//     case 'Pizza':
//       icon: <CiPizza />;
//       break;
//     case 'Esfiha':
//       icon: <CiPizza />;
//   }
// };

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
        hover:text-neutral-800
        transition
        cursor-pointer
        ${selected === label ? 'border-b-neutral-800' : 'border-transparent'}
        ${selected === label ? 'text-neutral-800' : 'text-neutral-500'}
        `}
      onClick={() => {
        onClick(label);
      }}
    >
      <div className='font-semibold text-base'>{label}</div>
    </div>
  );
};

export default CategoryBox;
