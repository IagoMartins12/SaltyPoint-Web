import React from 'react';

// Importe as dependências necessárias, incluindo ProductCardType e useProductModal
import Image from 'next/image';
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai';
import { useProductModal } from '@/app/hooks/modals/useProduct';
import { handleSetSelected } from '@/app/utils';
import { PizzaProductModalType } from '@/app/types/ComponentTypes';
import { Product } from '@/app/types/ModelsType';

export const PizzaCard: React.FC<PizzaProductModalType> = ({
  product,
  selectedProduct2,
  setSelectedProduct2,
  checkDiference,
  removeSelected,
}) => {
  const productModal = useProductModal();

  return (
    <label
      className={`flex min-h-[20vh] sm:min-h-[12vh] rounded-2xl cursor-pointer w-[100%]`}
    >
      <input
        type='radio'
        name='selectedProduct2'
        value={product.id}
        defaultChecked={selectedProduct2 === product.id}
        onClick={() => {
          if (selectedProduct2 === product.id) {
            removeSelected(setSelectedProduct2);
          } else {
            handleSetSelected('cornicione');
            setSelectedProduct2(product.id);
          }
        }}
        style={{ display: 'none' }}
      />
      <div
        className={`flex rounded-2xl cursor-pointer w-[100%] ${
          selectedProduct2 === product.id ? '' : ''
        }`}
      >
        {/* Conteúdo do componente PizzaCart */}
        <div className='relative w-[30%] h-full'>
          <div className=' w-full h-full relative'>
            <Image
              fill
              src={product.product_image}
              alt='product-image'
              className='rounded-xl px-2 py-2'
              sizes='100%'
            />
          </div>
        </div>

        <div className='flex flex-col w-[70%] h-full gap-4 py-2 px-5 justify-between'>
          <div className='flex flex-col gap-4'>
            <span className='font-semibold text-base sm:text-lg'>
              {product.name}
            </span>
            <span className='font-light text-sm whitespace-pre-line'>
              {product.description}
            </span>
            {productModal.currentProduct &&
            (productModal.currentProduct as Product)?.value >=
              product.value ? null : (
              <span className='text-sm font-semibold text-red-500'>
                + {checkDiference(product)}
              </span>
            )}
          </div>
        </div>
        <div className='flex items-center justify-center'>
          {selectedProduct2 === product.id ? (
            <AiOutlineClose size={25} fill='red' />
          ) : (
            <AiOutlinePlus size={25} fill='red' />
          )}
        </div>
      </div>
    </label>
  );
};
