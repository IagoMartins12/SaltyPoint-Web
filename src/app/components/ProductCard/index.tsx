import { ProductCardType } from '@/app/types/ComponentTypes';
import Image from 'next/image';

export const ProductCard: React.FC<ProductCardType> = ({ product }) => {
  return (
    <div className='w-5/12 flex border-2 h-60 p-2 rounded-2xl'>
      <div className='relative w-5/12 h-full'>
        <Image fill src={product.product_image} alt='product-image' />
      </div>
      <div className='flex flex-col w-7/12 h-full gap-4 py-2 px-5 justify-between'>
        <div className='flex flex-col gap-4'>
          <span className='font-semibold text-lg'> {product.name} </span>
          <span className='font-light text-sm'> {product.description} </span>
        </div>
        <span className='font-bold text-lg'>R$ {product.value.toFixed(2)}</span>
      </div>
    </div>
  );
};
