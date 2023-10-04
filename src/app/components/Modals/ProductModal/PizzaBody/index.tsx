import React, { useState } from 'react';
import { TextArea } from '@/app/components/Input';
import { PizzaCard } from '@/app/components/PizzaCard';
import { useFormHook } from '@/app/hooks/customHooks/useFormHook';
import { useProductModal } from '@/app/hooks/modals/useProduct';
import useGlobalStore from '@/app/hooks/store/useGlobalStore';
import { PizzaModalProps, ProductModalProps } from '@/app/types/ComponentTypes';
import Image from 'next/image';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { handleSetSelected } from '@/app/utils';
import { CornicioneCart } from '@/app/components/CornicioneCart';

export const PizzaBody: React.FC<PizzaModalProps> = ({
  disabled,
  quantity,
  value,
  decreaseQuantity,
  increaseQuantity,
  onSubmit,
  setValue,
}) => {
  const [selectedFlavor, setSelectedFlavor] = useState('');
  const [selectedProduct2, setSelectedProduct2] = useState<null | string>(null);
  const [selectedProduct3, setSelectedProduct3] = useState<null | string>(null);

  const productModal = useProductModal();
  const { products, categorys } = useGlobalStore();
  const { handleSubmit, register } = useFormHook();

  const sizes = [
    {
      name: 'Pizza',
    },
    {
      name: 'Brotinho',
    },
  ];

  const flavors = [
    {
      name: '1 Sabor',
    },
    {
      name: '2 Sabores',
    },
  ];

  const removeSelected = () => {
    setSelectedProduct2(null);
  };

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
        onSubmit={handleSubmit(onSubmit)}
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
            {sizes.map(size => (
              <div
                className='flex border-b-2 justify-between p-2 min-h-[7vh]'
                key={size.name}
              >
                <span className='text-medium font-medium '>{size.name} </span>
                <input
                  type='radio'
                  name='pizzaSize'
                  id={size.name}
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
            {flavors.map(flavor => (
              <div
                className='flex border-b-2 justify-between p-2 min-h-[7vh]'
                key={flavor.name}
              >
                <span className='text-medium font-medium '>{flavor.name} </span>
                <input
                  type='radio'
                  name='pizzaFlavor'
                  id={flavor.name}
                  onChange={() => {
                    setSelectedProduct2(null);
                    setSelectedFlavor(flavor.name);
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
                            removeSelected={removeSelected}
                            value={value}
                            setValue={setValue}
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
                          selectedProduct2={selectedProduct3}
                          setSelectedProduct2={setSelectedProduct3}
                          removeSelected={removeSelected}
                          value={value}
                          setValue={setValue}
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
