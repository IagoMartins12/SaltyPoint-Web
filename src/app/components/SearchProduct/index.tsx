import { useProductModal } from '@/app/hooks/modals/useProduct';
import { SearchProductBox } from '@/app/types/ComponentTypes';
import Image from 'next/image';

export const SearchProduct: React.FC<SearchProductBox> = ({ product }) => {
  const productModal = useProductModal();

  return (
    <div
      className='w-full flex  border-1 px-4 py-2 min-h-[17vh] cursor-pointer'
      onClick={() => {
        productModal.setCurrentProduct(product);
        productModal.onOpen();
      }}
    >
      <div className='w-7/12 flex flex-col gap-3'>
        <span className='text-lg font-medium'>{product.name}</span>
        <span className='text-sm font-light'>{product.description}</span>
      </div>
      <div className='w-5/12 relative'>
        <Image
          fill
          src={product.product_image}
          alt='product_image'
          className='object-cover rounded-md'
          sizes='100%'
        />
      </div>
    </div>
  );
};
