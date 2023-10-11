import { ProductCardType } from '@/app/types/ComponentTypes';
import Image from 'next/image';
import { FavoriteButton } from '../FavoriteButton';
import usePrivateStore from '@/app/hooks/store/usePrivateStore';
import { useProductModal } from '@/app/hooks/modals/useProduct';
import {
  useCartMenuState,
  useMenuHeaderState,
} from '@/app/hooks/modals/useModal';
import { useEffect, useState } from 'react';

export const ProductCard: React.FC<ProductCardType> = ({
  product,
  fullWidth = false,
}) => {
  const [imageZIndex, setImageZIndex] = useState(0);

  const { favorites } = usePrivateStore();
  const productModal = useProductModal();
  const leftMenu = useMenuHeaderState();
  const rightCart = useCartMenuState();

  const handleImageZIndex = () => {
    if (leftMenu.isOpen || rightCart.isOpen) {
      setImageZIndex(-10);
    } else {
      setTimeout(() => {
        setImageZIndex(0);
      }, 500);
    }
  };

  const handleCheckFavorites = () => {
    return favorites.some(p => p.product_id === product.id);
  };

  useEffect(() => {
    handleImageZIndex();
  }, [leftMenu.isOpen, rightCart.isOpen]);

  return (
    <div
      className={`flex shadow-md min-h-[18vh] p-2 rounded-2xl cursor-pointer ${
        fullWidth ? 'w-[100%]' : 'w-full md:w-[48%] lg:w-[30%]'
      }`}
      onClick={() => {
        productModal.setCurrentProduct(product);
        productModal.onOpen();
      }}
    >
      <div
        className={` w-5/12 h-full ${
          imageZIndex === -10 ? '-z-10' : ''
        } relative rounded-xl`}
      >
        <Image
          fill
          src={product.product_image}
          alt='product-image'
          className='rounded-xl px-2 py-2 object-contain '
          sizes='100%'
        />

        <div
          className='z-30'
          onClick={ev => {
            ev.stopPropagation();
          }}
        >
          <FavoriteButton product={product} filled={handleCheckFavorites()} />
        </div>
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
