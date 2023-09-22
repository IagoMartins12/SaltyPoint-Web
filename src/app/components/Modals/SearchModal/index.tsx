import useSearchModal from '@/app/hooks/modals/useSearchModal';
import useGlobalStore from '@/app/hooks/store/useGlobalStore';
import { useTheme } from 'next-themes';
import { AiOutlineSearch } from 'react-icons/ai';
import { IoCloseOutline } from 'react-icons/io5';
import { SearchCategory } from '../../SearchCategory';
import { useState } from 'react';
import { SearchProduct } from '../../SearchProduct';
import { Product } from '@/app/types/ModelsType';

export const SearchModal = () => {
  const [productState, setProductState] = useState<[] | Product[]>([]);
  const [selected, setSelected] = useState<string | null>(null);

  const searchModal = useSearchModal();
  const { theme } = useTheme();
  const { categorys, products } = useGlobalStore();

  const handleSetSelected = (category_id: string) => {
    if (category_id === selected) {
      setSelected(null);
      return setProductState(products);
    }
    setSelected(category_id);
    HandleCategorySelected(category_id);
  };

  const HandleCategorySelected = (category_id: string) => {
    const newProducts = products.filter(p => p.category_id === category_id);
    return setProductState(newProducts);
  };

  const handleSearchInput = (query: string) => {
    const newProducts = products.filter(
      p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase()),
    );

    return setProductState(newProducts);
  };
  return (
    <div
      className={`menuModalsPosition rounded-md gap-6 ${
        theme === 'light' ? 'bg-white' : 'bg-black'
      }  flex-col z-50 ${searchModal.isOpen ? 'flex' : 'hidden'}`}
    >
      <div className='flex items-center justify-between ml-5 mt-2'>
        <IoCloseOutline
          size={30}
          onClick={() => searchModal.onClose()}
          style={{ cursor: 'pointer' }}
        />
      </div>
      <div className='relative flex w-10/12 mx-auto'>
        <input
          type='text'
          className='w-full px-2 py-2 rounded-md border-b-2 bg-transparent'
          onChange={ev => {
            handleSearchInput(ev.target.value);
          }}
        />
        <AiOutlineSearch
          size={30}
          className='right-2 top-1 absolute cursor-pointer'
        />
      </div>

      <div className='flex flex-wrap gap-4 w-10/12 mx-auto'>
        {categorys
          .filter(c => c.category_name !== 'Bordas')
          .map((category, i) => (
            <SearchCategory
              category={category}
              onClick={handleSetSelected}
              selected={selected}
              key={category.id}
            />
          ))}
      </div>

      <div className='privacyScroll overflow-auto'>
        <div className='flex flex-col  gap-4 w-10/12 mx-auto '>
          {productState.map(p => (
            <SearchProduct product={p} key={p.id} />
          ))}
        </div>
      </div>
    </div>
  );
};
