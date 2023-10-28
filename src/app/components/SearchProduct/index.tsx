import { useProductModal } from '@/app/hooks/modals/useProduct';
import { SearchProductBox } from '@/app/types/ComponentTypes';
import Image from 'next/image';

export const SearchProduct: React.FC<SearchProductBox> = ({ product }) => {
  const productModal = useProductModal();

  return (
    <div
      className='w-full cardBG rounded-2xl flex flex-row-reverse shadow-md px-4 py-2 h-[18vh] cursor-pointer gap-2'
      onClick={() => {
        productModal.setCurrentProduct(product);
        productModal.onOpen();
      }}
    >
      <div className='w-7/12 flex py-2 h-full flex-col gap-3'>
        <span className='text-base sm:text-lg font-medium'>{product.name}</span>
        <span className='text-sm font-light overflow-hidden'>
          {product.description}
        </span>
      </div>
      <div className='w-5/12 h-full'>
        <Image
          src={product.product_image}
          alt='product-image'
          className='rounded-xl px-2 py-2 object-cover !w-full !h-full aspect-square '
          sizes='100%'
          width={100}
          height={100}
        />
      </div>
    </div>
  );
};
