import { SearchCategoryBox } from '@/app/types/ComponentTypes';

export const SearchCategory: React.FC<SearchCategoryBox> = ({ category }) => {
  return (
    <div>
      <span> {category.category_name}</span>
    </div>
  );
};
