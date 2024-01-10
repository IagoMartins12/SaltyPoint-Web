import { useDeleteCartItem } from '@/app/hooks/modals/useDelete';
import useGlobalStore from '@/app/hooks/store/useGlobalStore';
import { CartProductCardType } from '@/app/types/ComponentTypes';

import { AiOutlineDelete } from 'react-icons/ai';

export const CartProductCard: React.FC<CartProductCardType> = ({
  cart_product,
}) => {
  const { products } = useGlobalStore();

  const deleteItemModal = useDeleteCartItem();

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

  const handleOpenDeleteModal = (cart_id: string) => {
    deleteItemModal.setCurrentItem(cart_id);

    deleteItemModal.onOpen();
  };

  console.log('name', getProductName2(cart_product.id, null));
  return (
    <div className='w-full flex gap-6 cardBG rounded-2xl justify-center p-4 relative min-h-[7rem]'>
      <div className='flex flex-col gap-4 w-full justify-center'>
        <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between '>
          <span className='font-medium text-sm sm:text-lg pr-6 sm:pr-0'>
            {cart_product.quantity}x{' '}
            {getProductName2(cart_product.product_id, cart_product.size)}
          </span>
          <span className='font-light text-sm sm:text-base absolute sm:static right-3 bottom-3'>
            R$ {cart_product.value}
          </span>
        </div>
        <div className='flex flex-col'>
          {cart_product.product_id_2 ? (
            <>
              {[cart_product.product_id, cart_product.product_id_2].map(
                (productId, index) => (
                  <li
                    key={index}
                    className='font-light text-sm sm:text-base px-2'
                  >
                    {cart_product.quantity}x 1/2{' '}
                    {getProductName2(productId, cart_product.size)}
                  </li>
                ),
              )}
            </>
          ) : (
            <li className='font-light  text-sm sm:text-base px-2 '>
              {cart_product.quantity}x{' '}
              {getProductName2(cart_product.product_id, cart_product.size)}
            </li>
          )}

          {cart_product.product_id_3 ? (
            <li className='font-light  text-sm sm:text-base px-2'>
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

      {!getProductName2(cart_product.id, cart_product.size).includes(
        'Promoção',
      ) ? (
        <div className='pt-1 z-40'>
          <AiOutlineDelete
            size={22}
            fill='red'
            className='cursor-pointer'
            onClick={() => {
              handleOpenDeleteModal(cart_product.id);
            }}
          />
        </div>
      ) : null}
    </div>
  );
};
