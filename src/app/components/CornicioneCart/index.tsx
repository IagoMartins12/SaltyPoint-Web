import React from 'react';

// Importe as dependências necessárias, incluindo ProductCardType e useProductModal
import { CornicioneProductModalType } from '@/app/types/ComponentTypes';
import Image from 'next/image';
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai';

export const CornicioneCart: React.FC<CornicioneProductModalType> = ({
  product,
  selectedProduct3,
  setSelectedProduct3,
}) => {
  return (
    <label className={`flex h-[10vh] rounded-2xl cursor-pointer w-full`}>
      <input
        type='radio'
        name='selectedProduct3'
        value={product.id}
        className='hidden'
        onClick={() => {
          if (selectedProduct3 === product.id) {
            setSelectedProduct3(null);
          } else {
            setSelectedProduct3(product.id);
          }
        }}
        defaultChecked={product.name === 'Sem borda'}
      />
      <div
        className={`flex min-h-[10vh] rounded-2xl cursor-pointer w-[100%] ${
          selectedProduct3 === product.id ? '' : ''
        }`}
      >
        {/* Conteúdo do componente PizzaCart */}
        <div className='relative w-3/12 h-full'>
          <div className=' w-full h-full relative'>
            <Image
              fill
              src={product.product_image}
              alt='product-image'
              className='rounded-xl object-cover'
              sizes='100%'
            />
          </div>
        </div>
        <div className='flex flex-col w-9/12 h-full gap-4 py-2 px-5 justify-between'>
          <div className='flex flex-col gap-4'>
            <span className='font-semibold text-lg'> {product.name} </span>
            {product.value > 0 ? (
              <span className='text-sm font-semibold text-red-500'>
                + {product.value.toFixed(2)}
              </span>
            ) : null}
          </div>
        </div>
        <div className='flex items-center justify-center'>
          {selectedProduct3 === product.id ? (
            <AiOutlineClose size={25} fill='red' />
          ) : (
            <AiOutlinePlus size={25} fill='red' />
          )}
        </div>
      </div>
    </label>
  );
};
