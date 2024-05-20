import { SearchCategoryBox } from '@/app/types/ComponentTypes';

export const SearchCategory: React.FC<SearchCategoryBox> = ({
  category,
  selected,
  onClick,
}) => {
  return (
    <div
      onClick={() => {
        onClick(category.id);
      }}
      className={`px-4 py-2 border-2 cursor-pointer rounded-3xl border-red-500 ${
        selected === category.id ? 'bg-red-500' : 'bg-transparent'
      }`}
    >
      <span
        className={`font-medium text-sm md:text-base ${
          selected === category.id ? 'text-white' : 'text-red-500'
        }`}
      >
        {category.category_name}
      </span>
    </div>
  );
};
