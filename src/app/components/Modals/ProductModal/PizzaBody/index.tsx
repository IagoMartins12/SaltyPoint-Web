import React from 'react';
import { TextArea } from '@/app/components/Input';
import { PizzaCard } from '@/app/components/PizzaCard';
import { useFormHook } from '@/app/hooks/customHooks/useFormHook';
import { useProductModal } from '@/app/hooks/modals/useProduct';
import useGlobalStore from '@/app/hooks/store/useGlobalStore';
import { ProductModalProps } from '@/app/types/ComponentTypes';
import Image from 'next/image';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { handleSetSelected } from '@/app/utils';
import { CornicioneCart } from '@/app/components/CornicioneCart';
import { useCustomProductModal } from '../useProductModal';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { CartProductDto } from '@/app/types/Dtos';

export const PizzaBody: React.FC<ProductModalProps> = ({ onSubmit }) => {
  const productModal = useProductModal();
  const { products, categorys } = useGlobalStore();
  const { handleSubmit, register } = useFormHook();

  const newSubmit: SubmitHandler<FieldValues> = async data => {
    const object = {
      product_id: productModal.currentProduct?.id,
      product_id_2: selectedProduct2,
      product_id_3: selectedProduct3,
      observation: data.observation,
      quantity: quantity,
    } as CartProductDto;
  };

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
  } = useCustomProductModal();

  return (
    <div className=' h-full w-full flex flex-col gap-6 pb-6'>
      <div className='w-full h-[25%] relative rounded-lg '>
        <Image
          fill
          src={productModal.currentProduct?.product_image ?? ''}
          alt='Product image'
          className='rounded-lg !sticky'
          sizes='100%'
        />
      </div>

      <form
        className='flex flex-col gap-8 items-center justify-center'
        onSubmit={handleSubmit(newSubmit)}
      >
        <span className='font-light text-2xl text-center'>
          {productModal.currentProduct?.name}
        </span>

        <div id='size' className='flex flex-col w-full'>
          <div className='flex border-b-2 justify-between'>
            <span className='text-lg '>Selecione o tamanho </span>
            <span className='bg-black py-2 px-2 text-white text-xs rounded-xl'>
              Obrigatorio
            </span>
          </div>

          <div className='flex flex-col gap-2'>
            {sizes.map((size, i) => (
              <div
                className='flex border-b-2 justify-between p-2 min-h-[7vh]'
                key={i}
              >
                <span className='text-medium font-medium '>{size} </span>
                <input
                  type='radio'
                  name='pizzaSize'
                  id={size}
                  onClick={() => {
                    handleSetSelected('flavor');
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        <div id='flavor' className='flex flex-col w-full'>
          <div className='flex border-b-2 justify-between pb-2'>
            <span className='text-lg '>Quantos sabores ?</span>
            <span className='bg-black py-2 px-2 text-white text-xs rounded-xl'>
              Obrigatorio
            </span>
          </div>

          <div className='flex flex-col gap-2'>
            {flavors.map((flavor, i) => (
              <div
                className='flex border-b-2 justify-between p-2 min-h-[7vh]'
                key={i}
              >
                <span className='text-medium font-medium '>{flavor} </span>
                <input
                  type='radio'
                  name='pizzaFlavor'
                  id={flavor}
                  onChange={() => {
                    setSelectedFlavor(flavor);
                  }}
                  onClick={() => {
                    handleSetSelected('pizzas');
                  }}
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
                {categorys
                  .filter(
                    c => c.id === productModal.currentProduct?.category_id,
                  )
                  .map(category =>
                    products
                      .filter(
                        p =>
                          p.id !== productModal.currentProduct?.id &&
                          p.category_id === category.id,
                      )
                      .map(product => (
                        <div
                          className='flex border-b-2 justify-between p-2 min-h-[7vh]'
                          key={product.id} // Adicione uma chave única para evitar avisos
                        >
                          <PizzaCard
                            product={product}
                            selectedProduct2={selectedProduct2}
                            setSelectedProduct2={setSelectedProduct2}
                          />
                        </div>
                      )),
                  )}
              </div>
            </div>
          )}
        </div>

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
          className={`flex gap-3 items-center justify-center w-full py-2 mb-4 rounded-lg cursor-pointer bg-red-600 text-white ${
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
