import { TextArea } from '@/app/components/Input';
import { useFormHook } from '@/app/hooks/customHooks/useFormHook';
import { useProductModal } from '@/app/hooks/modals/useProduct';
import Image from 'next/image';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { useCustomProductModal } from '../useProductModal';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { addCartProduct } from '@/app/services';
import { CartProductDto } from '@/app/types/Dtos';
import usePrivateStore from '@/app/hooks/store/usePrivateStore';
import toast from 'react-hot-toast';
import { Product } from '@/app/types/ModelsType';
import { useLoginModal, useSearchModal } from '@/app/hooks/modals/useModal';
import useAuth from '@/app/hooks/auth/useAuth';

export const ProductBody = () => {
  const { handleSubmit, register } = useFormHook();
  const { cart_product, setCart_product } = usePrivateStore();

  const { isLogged } = useAuth();

  const loginModal = useLoginModal();
  const searchModal = useSearchModal();
  const productModal = useProductModal();

  const { decreaseQuantity, increaseQuantity, quantity, disabled, value } =
    useCustomProductModal();

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    if (!isLogged) {
      productModal.onClose();

      if (searchModal.isOpen) searchModal.onClose();

      loginModal.onOpen();
      return toast.error('Faça o login para adicionar produtos');
    }

    const response = await addCartProduct({
      product_id: productModal.currentProduct?.id,
      observation: data.observation,
      quantity: quantity,
      value: value,
    } as CartProductDto);

    if (response) {
      const updatedCartProduct = [...cart_product, response];
      setCart_product(updatedCartProduct);
      toast.success('Produto adicionado');
      productModal.onClose();
    }
  };

  return (
    <div className='overflow-auto privacyScroll h-full flex flex-col gap-6'>
      <div className='w-full h-[25%] relative rounded-lg '>
        <Image
          fill
          src={(productModal.currentProduct as Product).product_image ?? ''}
          alt='Product image'
          className='rounded-lg !sticky object-contain'
          sizes='100%'
        />
      </div>

      <form
        className='flex flex-col gap-8 items-center justify-center'
        onSubmit={handleSubmit(onSubmit)}
      >
        <span className='font-light text-2xl text-center'>
          {(productModal.currentProduct as Product)?.name}
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
          {/* <input
            className='w-12 text-center h-10'
            type='number'
            value={quantity}
            onChange={ev => {
              const newValue = parseInt(ev.target.value, 10);
              if (!isNaN(newValue) && newValue >= 0) {
                setQuantity(newValue);
                console.log(newValue);
              }
            }}
          /> */}
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
