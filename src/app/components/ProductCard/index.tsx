import { ProductCardType } from '@/app/types/ComponentTypes';
import Image from 'next/image';
import { useProductModal } from '@/app/hooks/modals/useProduct';

export const ProductCard: React.FC<ProductCardType> = ({
  product,
  fullWidth = false,
}) => {
  const productModal = useProductModal();

  return (
    <div
      className={`flex  cardBG  h-[26vh] sm:h-[23vh] p-2 shadow-md rounded-2xl cursor-pointer  ${
        fullWidth ? 'w-[100%]' : 'w-full md:w-[48%] xl:w-[32%]'
      }`}
      onClick={() => {
        productModal.setCurrentProduct(product);
        productModal.onOpen();
      }}
    >
      <div className={` w-6/12 sm:w-5/12 h-full  aspect-ratio rounded-xl`}>
        <Image
          src={product.product_image}
          alt='product-image'
          className='rounded-xl p-2  object-fill !w-full !h-full '
          sizes='100%'
          width={100}
          height={100}
          priority
        />
      </div>
      <div className='flex flex-col w-6/12 sm:w-7/12 h-full gap-4 py-2 px-5 justify-between overflow-hidden'>
        <div className='flex flex-col gap-4 h-4/5 overflow-hidden'>
          <span className='font-semibold text-lg'> {product.name} </span>
          <span className='font-light text-sm '> {product.description} </span>
        </div>
        <span className='font-bold text-lg'>R$ {product.value.toFixed(2)}</span>
      </div>
    </div>
  );
};
