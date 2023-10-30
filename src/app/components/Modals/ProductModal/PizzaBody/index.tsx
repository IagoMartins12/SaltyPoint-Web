import React, { useState } from 'react';
import { TextArea } from '@/app/components/Input';
import { PizzaCard } from '@/app/components/PizzaCard';
import { useFormHook } from '@/app/hooks/customHooks/useFormHook';
import { useProductModal } from '@/app/hooks/modals/useProduct';
import useGlobalStore from '@/app/hooks/store/useGlobalStore';
import Image from 'next/image';
import {
  AiFillCheckCircle,
  AiOutlineCheck,
  AiOutlineMinus,
  AiOutlinePlus,
} from 'react-icons/ai';
import { handleSetSelected } from '@/app/utils';
import { CornicioneCart } from '@/app/components/CornicioneCart';
import { useCustomProductModal } from '../useProductModal';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { CartProductDto } from '@/app/types/Dtos';
import { addCartProduct } from '@/app/services';
import usePrivateStore from '@/app/hooks/store/usePrivateStore';
import toast from 'react-hot-toast';
import { Product } from '@/app/types/ModelsType';
import { useLoginModal, useSearchModal } from '@/app/hooks/modals/useModal';
import useAuth from '@/app/hooks/auth/useAuth';
import { AnimationCart } from '@/app/components/AnimationCart';
import { FavoriteButton } from '@/app/components/FavoriteButton';
import { FaCheckCircle } from 'react-icons/fa';

export const PizzaBody = () => {
  const [hasPlayed, setHasPlayed] = useState(false);

  const { products, categorys } = useGlobalStore();
  const { handleSubmit, register } = useFormHook();
  const { cart_product, setCart_product } = usePrivateStore();
  const { isLogged } = useAuth();
  const { favorites } = usePrivateStore();

  const loginModal = useLoginModal();
  const productModal = useProductModal();
  const searchModal = useSearchModal();

  const {
    decreaseQuantity,
    increaseQuantity,
    quantity,
    disabled,
    value,
    flavors,
    sizes,
    selectedFlavor,
    setSelectedFlavor,
    selectedProduct2,
    setSelectedProduct2,
    selectedProduct3,
    setSelectedProduct3,
    selectedSize,
    setSelectedSize,
  } = useCustomProductModal();

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    if (!isLogged) {
      productModal.onClose();

      if (searchModal.isOpen) searchModal.onClose();

      loginModal.onOpen();
      return toast.error('Faça o login para adicionar produtos');
    }

    const response = await addCartProduct({
      product_id: productModal.currentProduct?.id,
      product_id_2: selectedProduct2,
      product_id_3: selectedProduct3,
      observation: data.observation,
      quantity: quantity,
      value: value,
      size: selectedSize,
    } as CartProductDto);

    if (response) {
      setHasPlayed(true);
      const updatedCartProduct = [...cart_product, response];
      setCart_product(updatedCartProduct);
    }
  };

  const brotinhoNames = products
    .filter(
      p =>
        p.name !== (productModal.currentProduct as Product)?.name &&
        p.category_id === (productModal.currentProduct as Product)?.category_id,
    )
    .map(p => ({
      ...p,
      name: p.name.replace('Pizza', 'Brotinho'),
    }));

  const handleCheckFavorites = () => {
    return favorites.some(
      p => p.product_id === productModal.currentProduct?.id,
    );
  };

  const getCategory = categorys.find(
    c => c.id === (productModal.currentProduct as Product).category_id,
  )?.category_name;

  return (
    <div className=' h-full w-full flex flex-col gap-6 pb-6'>
      <div className='w-full h-[25%] relative rounded-lg '>
        <Image
          fill
          src={(productModal.currentProduct as Product)?.product_image ?? ''}
          alt='Product image'
          className='rounded-lg !sticky object-fill opacity-90'
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

        <div id='size' className='flex flex-col w-full'>
          <div className='flex border-b-2 justify-between pb-2'>
            <span className='text-lg '>Selecione o tamanho </span>
            {/* 
            {selectedSize !== 0 && selectedSize !== 1 ? (
              <span className='bg-black py-2 px-2 text-white text-xs rounded-xl'>
                Obrigatorio
              </span>
            ) : (
              <AiFillCheckCircle fill='green' size={25} className='mr-3' />
            )} */}
          </div>

          <div className='flex flex-col gap-2'>
            {sizes.map((size, i) => (
              <div
                className='flex border-b-2 justify-between p-4 min-h-[7vh]'
                key={i}
              >
                <label className='text-medium font-medium' htmlFor='pizzaSize'>
                  {size}{' '}
                </label>
                <input
                  type='radio'
                  name='pizzaSize'
                  id={size}
                  onClick={() => {
                    handleSetSelected('flavor');
                    setSelectedSize(i);
                  }}
                  defaultChecked={size === 'Pizza'}
                  className='accent-red-500 w-5 h-5'
                />
              </div>
            ))}
          </div>
        </div>

        <div id='flavor' className='flex flex-col w-full'>
          <div className='flex border-b-2 justify-between pb-2'>
            <span className='text-lg '>Quantos sabores ?</span>
            {/* <AiFillCheckCircle fill='green' size={25} className='mr-3' /> */}
          </div>

          <div className='flex flex-col gap-2'>
            {flavors.map((flavor, i) => (
              <div
                className='flex border-b-2 justify-between p-4 min-h-[7vh]'
                key={i}
              >
                <span className='text-medium font-medium '>{flavor} </span>
                <input
                  type='radio'
                  name='pizzaFlavor'
                  id={flavor}
                  onChange={() => {
                    if (flavor === '1 Sabor') {
                      setSelectedProduct2(null);
                    }
                    setSelectedFlavor(flavor);
                  }}
                  onClick={() => {
                    handleSetSelected('pizzas');
                  }}
                  defaultChecked={flavor === '1 Sabor'}
                  className='accent-red-500 w-5 h-5'
                />
              </div>
            ))}
          </div>
        </div>

        <div id='pizzas' className='flex flex-col w-full'>
          {selectedFlavor === '2 Sabores' && (
            <div id='pizzas' className='flex flex-col w-full'>
              <div className='flex border-b-2 justify-between pb-2'>
                <span className='text-lg '>Sabores?</span>
                <span className='bg-black py-2 px-2 text-white text-xs rounded-xl'>
                  {selectedProduct2 ? '1' : '0'} / 1
                </span>
              </div>

              <div className='flex flex-col gap-2'>
                {selectedSize === 0
                  ? categorys
                      .filter(
                        c =>
                          c.id ===
                          (productModal.currentProduct as Product)?.category_id,
                      )
                      .map(category =>
                        products
                          .filter(
                            p =>
                              p.id !==
                                (productModal.currentProduct as Product)?.id &&
                              p.category_id === category.id,
                          )
                          .map(product => (
                            <div
                              className='flex border-b-2 justify-between p-2 min-h-[18vh] sm:min-h-[17vh]'
                              key={product.id}
                            >
                              <PizzaCard
                                product={product}
                                selectedProduct2={selectedProduct2}
                                setSelectedProduct2={setSelectedProduct2}
                              />
                            </div>
                          )),
                      )
                  : brotinhoNames.map(product => (
                      <div
                        className='flex border-b-2 justify-between p-2 min-h-[18vh] sm:min-h-[17vh]'
                        key={product.id}
                      >
                        <PizzaCard
                          product={product}
                          selectedProduct2={selectedProduct2}
                          setSelectedProduct2={setSelectedProduct2}
                        />
                      </div>
                    ))}
              </div>
            </div>
          )}
        </div>

        {getCategory && !getCategory.includes('Doces') && (
          <div id='cornicione' className='flex flex-col w-full'>
            <div className='flex flex-col w-full'>
              <div className='flex border-b-2 justify-between pb-2'>
                <span className='text-lg '>Bordas?</span>
                <span className='bg-black py-2 px-2 text-white text-xs rounded-xl'>
                  {selectedProduct3 ? '1' : '0'} / 1
                </span>
              </div>

              <div className='flex flex-col gap-2'>
                {categorys
                  .filter(c => c.category_name === 'Bordas')
                  .map(category =>
                    products
                      .filter(p => p.category_id === category.id)
                      .map(product => (
                        <div
                          className='flex border-b-2 justify-between p-2'
                          key={product.id} // Adicione uma chave única para evitar avisos
                        >
                          <CornicioneCart
                            product={product}
                            selectedProduct3={selectedProduct3}
                            setSelectedProduct3={setSelectedProduct3}
                          />
                        </div>
                      )),
                  )}
              </div>
            </div>
          </div>
        )}

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
              Adicionar R$ <span>{value}</span>
            </span>
          </button>
        )}
      </form>
    </div>
  );
};
