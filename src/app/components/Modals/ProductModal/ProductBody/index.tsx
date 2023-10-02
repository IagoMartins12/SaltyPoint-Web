import { useProductModal } from '@/app/hooks/modals/useProduct';
import { ProductModalProps } from '@/app/types/ComponentTypes';
import Image from 'next/image';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

export const ProductBody: React.FC<ProductModalProps> = ({
  disabled,
  quantity,
  value,
  decreaseQuantity,
  increaseQuantity,
}) => {
  const productModal = useProductModal();

  return (
    <div className='overflow-auto privacyScroll h-full flex flex-col gap-6'>
      <div className='w-full h-[30%] border-2 relative rounded-lg '>
        <Image
          fill
          src={productModal.currentProduct?.product_image ?? ''}
          alt='Product image'
          className='rounded-lg'
          sizes='100%'
        />
      </div>

      <div className='flex flex-col gap-8 items-center justify-center'>
        <span className='font-light text-2xl text-center'>
          {productModal.currentProduct?.name}
        </span>

        <div></div>
        <div className='flex gap-8 items-center justify-center'>
          <AiOutlineMinus
            size={25}
            onClick={decreaseQuantity}
            className='cursor-pointer'
          />
          <span className='font-medium text-xl'> {quantity}</span>
          <AiOutlinePlus
            size={25}
            onClick={increaseQuantity}
            className='cursor-pointer'
          />
        </div>

        <button
          type='submit'
          className={`flex gap-3 items-center justify-center w-full py-2 rounded-lg bg-red-600 text-white ${
            disabled ? '' : 'opacity-60'
          }`}
          disabled={disabled}
        >
          <span>
            Adicionar R$ <span>{value}</span>
          </span>
        </button>
      </div>
    </div>
  );
};
