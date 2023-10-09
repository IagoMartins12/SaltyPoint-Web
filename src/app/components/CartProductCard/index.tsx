import useGlobalStore from '@/app/hooks/store/useGlobalStore';
import { CartProductCardType } from '@/app/types/ComponentTypes';
import { Product } from '@/app/types/ModelsType';
import Image from 'next/image';
import { AiOutlineDelete } from 'react-icons/ai';

export const CartProductCard: React.FC<CartProductCardType> = ({
  cart_product,
}) => {
  const { products } = useGlobalStore();

  const getProductName2 = (productId: string, size: number | null) => {
    let name: string;
    const product = products.find(p => p.id === productId);

    if (!product) {
      return 'Produto desconhecido';
    }

    if (size === 1) {
      return product?.name.replace('Pizza', 'Brotinho');
    } else {
      return product?.name;
    }
  };

  return (
    <div className='w-full flex gap-6 shadow-md p-4'>
      {/* <div className='w-3/12 relative h-28 rounded-2xl'>
        <Image
          fill
          src={imageProduct?.product_image ?? ''}
          alt='product_image'
          className='object-contain rounded-2xl'
        />
      </div> */}

      <div className='flex flex-col gap-4 w-full justify-center'>
        <div className='flex items-center justify-between'>
          <span className='font-medium text-lg'>
            {cart_product.quantity}x{' '}
            {getProductName2(cart_product.product_id, cart_product.size)}
          </span>
          <span className='font-light text-base'> R$ {cart_product.value}</span>
        </div>
        <div className='flex flex-col'>
          {cart_product.product_id_2 ? (
            <>
              {[cart_product.product_id, cart_product.product_id_2].map(
                (productId, index) => (
                  <li key={index} className='font-light text-base px-2'>
                    {cart_product.quantity}x 1/2{' '}
                    {getProductName2(productId, cart_product.size)}
                  </li>
                ),
              )}
            </>
          ) : (
            <li className='font-light text-base px-2 '>
              {cart_product.quantity}x{' '}
              {getProductName2(cart_product.product_id, cart_product.size)}
            </li>
          )}

          {cart_product.product_id_3 ? (
            <li className='font-light text-base px-2'>
              {cart_product.quantity}x{' '}
              {getProductName2(cart_product.product_id_3, cart_product.size)}
            </li>
          ) : null}

          {cart_product.observation ? (
            <li className='font-light text-base px-2'>
              {cart_product.observation}
            </li>
          ) : null}
        </div>
      </div>

      <div className=''>
        <AiOutlineDelete size={25} fill='red' />
      </div>
    </div>
  );
};
