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
        hover:text-neutral-400
        transition
        cursor-pointer
        ${selected === label ? 'border-b-red-500' : 'border-transparent'}
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
