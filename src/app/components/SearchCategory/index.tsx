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
      className={`px-2 py-2 border-2 cursor-pointer ${
        selected === category.id ? 'bg-red-700' : 'bg-transparent'
      }`}
    >
      <span> {category.category_name}</span>
    </div>
  );
};
