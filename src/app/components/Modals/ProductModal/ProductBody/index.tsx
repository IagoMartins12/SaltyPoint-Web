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
import { useEffect, useState } from 'react';
import { FavoriteButton } from '@/app/components/FavoriteButton';
import { AnimationCart } from '@/app/components/Animations/AnimationCart';

export const ProductBody = () => {
  const [hasPlayed, setHasPlayed] = useState(false);
  const [animatedValue, setAnimatedValue] = useState(0); // Valor animado

  const { handleSubmit, register } = useFormHook();
  const { cart_product, setCart_product, favorites } = usePrivateStore();
  const { isLogged } = useAuth();
  const loginModal = useLoginModal();
  const searchModal = useSearchModal();
  const productModal = useProductModal();

  const {
    decreaseQuantity,
    increaseQuantity,
    setDisabled,
    quantity,
    disabled,
    value,
  } = useCustomProductModal();

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    if (!isLogged) {
      productModal.onClose();

      if (searchModal.isOpen) searchModal.onClose();

      loginModal.onOpen();
      return toast.error('Faça o login para adicionar produtos');
    }

    setDisabled(true);
    const response = await addCartProduct({
      product_id: productModal.currentProduct?.id,
      observation: data.observation,
      quantity: quantity,
      value: value,
    } as CartProductDto);
    setDisabled(false);

    if (response) {
      const updatedCartProduct = [...cart_product, response];
      setCart_product(updatedCartProduct);
      setHasPlayed(true);
    }
  };

  const handleCheckFavorites = () => {
    return favorites.some(
      p => p.product_id === productModal.currentProduct?.id,
    );
  };

  useEffect(() => {
    const targetValue = +value; // Converte o valor para número
    const animationDuration = 500; // Duração da animação em milissegundos

    const startAnimation = () => {
      let startTimestamp: number;
      const startValue = animatedValue; // Armazena o valor atual como valor inicial da animação

      const animate = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;

        const progress = timestamp - startTimestamp;
        const percentage = Math.min(progress / animationDuration, 1);

        // Calcula o valor animado atual com base no valor inicial e no valor final
        const currentAnimatedValue =
          startValue + (targetValue - startValue) * percentage;
        setAnimatedValue(currentAnimatedValue);

        if (percentage < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    };

    startAnimation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div className='overflow-auto privacyScroll h-full flex flex-col gap-6'>
      <div className='w-full  h-[35%]  sm:h-[45%] relative  aspect-ratio rounded-lg '>
        <Image
          fill
          src={(productModal.currentProduct as Product)?.product_image ?? ''}
          alt={(productModal.currentProduct as Product).name}
          className='rounded-lg  opacity-90'
          sizes='100%'
        />
        <FavoriteButton
          product={productModal.currentProduct as Product}
          filled={handleCheckFavorites()}
        />
      </div>

      <form
        className='flex flex-col gap-8 items-center justify-center'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='flex flex-col gap-2'>
          <span className='font-normal text-2xl text-center'>
            {(productModal.currentProduct as Product)?.name}
          </span>
          <span className='font-light text-center text-sm'>
            {(productModal.currentProduct as Product)?.description}
          </span>
        </div>

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

        {hasPlayed ? (
          <div
            className={` items-center justify-center w-full h-10 mb-5 rounded-lg `}
          >
            <span>
              <AnimationCart setHasPlayed={setHasPlayed} repeat />
            </span>
          </div>
        ) : (
          <button
            className={`flex gap-3 items-center h-10 justify-center w-full py-2 mb-5 rounded-lg cursor-pointer bg-red-600 text-white ${
              disabled ? '' : 'opacity-60'
            }`}
            disabled={!disabled}
          >
            <span>
              Adicionar R$ <span>{animatedValue.toFixed(2) ?? value}</span>
            </span>
          </button>
        )}
      </form>
    </div>
  );
};
