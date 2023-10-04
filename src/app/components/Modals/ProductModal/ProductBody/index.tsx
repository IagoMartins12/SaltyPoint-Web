import { TextArea } from '@/app/components/Input';
import { useFormHook } from '@/app/hooks/customHooks/useFormHook';
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
  onSubmit,
}) => {
  const productModal = useProductModal();
  const { handleSubmit, register } = useFormHook();

  return (
    <div className='overflow-auto privacyScroll h-full flex flex-col gap-6'>
      <div className='w-full h-[30%] relative rounded-lg '>
        <div className=' w-full h-full'>
          <Image
            fill
            src={productModal.currentProduct?.product_image ?? ''}
            alt='Product image'
            className='rounded-lg'
            sizes='100%'
          />
        </div>
      </div>

      <form
        className='flex flex-col gap-8 items-center justify-center'
        onSubmit={handleSubmit(onSubmit)}
      >
        <span className='font-light text-2xl text-center'>
          {productModal.currentProduct?.name}
        </span>

        <div className='w-full'>
          <TextArea register={register} />
        </div>
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
          className={`flex gap-3 items-center justify-center w-full py-2 rounded-lg cursor-pointer bg-red-600 text-white ${
            disabled ? '' : 'opacity-60'
          }`}
          disabled={!disabled}
        >
          <span>
            Adicionar R$ <span>{value}</span>
          </span>
        </button>
      </form>
    </div>
  );
};
