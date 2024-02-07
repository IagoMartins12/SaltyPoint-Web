import useGlobalStore from '@/app/hooks/store/useGlobalStore';
import { AiOutlineSearch } from 'react-icons/ai';
import { SearchCategory } from '../../SearchCategory';
import { useEffect, useState } from 'react';
import { SearchProduct } from '../../SearchProduct';
import { Product } from '@/app/types/ModelsType';
import Modal from '../../Modal';
import { useSearchModal } from '@/app/hooks/modals/useModal';
import { categoriesToExclude } from '../../CategoryMenu';

export const SearchModal = () => {
  const [productState, setProductState] = useState<[] | Product[]>([]);
  const [selected, setSelected] = useState<string | null>(null);

  const searchModal = useSearchModal();
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

    const filteredProduct = newProducts.filter(p =>
      visibleCategories.some(category => category.id === p.category_id),
    );

    setProductState(filteredProduct);
  };
  const visibleCategories = categorys.filter(
    category => !categoriesToExclude.includes(category.category_name),
  );

  useEffect(() => {
    setProductState(products);
  }, [products]);
  const body = (
    <div className='flex flex-col gap-5 w-11/12 mx-auto'>
      <div className='relative flex w-full'>
        <input
          type='text'
          className='w-full px-2 py-2 rounded-md border-b-2 bg-transparent'
          onChange={ev => {
            handleSearchInput(ev.target.value);
            setSelected(null);
          }}
        />
        <AiOutlineSearch
          size={30}
          className='right-2 top-1 absolute cursor-pointer'
        />
      </div>

      <div className='flex flex-wrap gap-4  w-full'>
        {visibleCategories.map((category, i) => (
          <SearchCategory
            category={category}
            onClick={handleSetSelected}
            selected={selected}
            key={category.id}
          />
        ))}
      </div>

      <div className='flex flex-col  gap-4  w-full'>
        {productState.length > 0 ? (
          productState.map(p => <SearchProduct product={p} key={p.id} />)
        ) : (
          <span>Sem resultado disponivel</span>
        )}
      </div>
    </div>
  );
  return (
    <>
      <Modal
        onClose={searchModal.onClose}
        body={body}
        isOpen={searchModal.isOpen}
        title='Pesquisar'
      />
    </>
  );
};
