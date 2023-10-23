import { useProductModal } from '@/app/hooks/modals/useProduct';
import { SearchProductBox } from '@/app/types/ComponentTypes';
import Image from 'next/image';

export const SearchProduct: React.FC<SearchProductBox> = ({ product }) => {
  const productModal = useProductModal();

  return (
    <div
      className='w-full flex flex-row-reverse shadow-md px-4 py-2 min-h-[15vh] cursor-pointer gap-2'
      onClick={() => {
        productModal.setCurrentProduct(product);
        productModal.onOpen();
      }}
    >
      <div className='w-7/12 flex flex-col gap-3'>
        <span className='text-base sm:text-lg font-medium'>{product.name}</span>
        <span className='text-sm font-light'>{product.description}</span>
      </div>
      <div className='w-5/12 relative'>
        <Image
          fill
          src={product.product_image}
          alt='product-image'
          className='rounded-xl px-2 py-2 object-contain '
          sizes='100%'
        />
      </div>
    </div>
  );
};
