import useGlobalStore from '@/app/hooks/store/useGlobalStore';
import { CartProductCardType } from '@/app/types/ComponentTypes';
import { Product } from '@/app/types/ModelsType';
import Image from 'next/image';
import { AiOutlineDelete } from 'react-icons/ai';

export const CartProductCard: React.FC<CartProductCardType> = ({
  cart_product,
}) => {
  const { products } = useGlobalStore();

  const imageProduct = products.find(p => p.id === cart_product.product_id);

  const getProductName = () => {
    if (cart_product.size === 1) {
      const product1 = products.find(p => p.id === cart_product.product_id);
      let product2: Product | undefined;
      let product3: Product | undefined;
      let productName;

      if (cart_product.product_id_2) {
        product2 = products.find(p => p.id === cart_product.product_id_2);
      }

      if (cart_product.product_id_3) {
        product3 = products.find(p => p.id === cart_product.product_id_3);
      }

      if (product1) {
        if (cart_product.product_id_2 && product2) {
          productName = `${
            cart_product.quantity
          }x Brotinho 1/2 ${product1.name.replace(
            'Pizza de',
            '',
          )} 1/2 ${product2.name.replace('Pizza de', '')}`;
        } else {
          productName = `${
            cart_product.quantity
          }x Brotinho ${product1.name.replace('Pizza de', '')}`;
        }

        if (cart_product.product_id_3 && product3) {
          productName += ` c/${product3.name}`;
        }

        return productName;
      }
    } else if (cart_product.size === 0) {
      const product = products.find(p => p.id === cart_product.product_id);
      let productName = product
        ? ` ${cart_product.quantity}x  ${product.name}`
        : 'Produto Desconhecido';

      if (cart_product.product_id_2) {
        const product2 = products.find(p => p.id === cart_product.product_id_2);
        if (product2) {
          productName += ` / ${product2.name}`;
        }
      }

      if (cart_product.product_id_3) {
        const product3 = products.find(p => p.id === cart_product.product_id_3);
        if (product3 && !product3.name.includes('Sem borda')) {
          productName += ` c/  ${product3.name}`;
        }
      }

      return productName;
    }
  };

  return (
    <div className='w-full flex gap-6 shadow-md px-2 py-2'>
      <div className='w-3/12 relative h-28 rounded-2xl'>
        <Image
          fill
          src={imageProduct?.product_image ?? ''}
          alt='product_image'
          className='object-contain rounded-2xl'
        />
      </div>

      <div className='flex flex-col gap-4 w-9/12 justify-center'>
        <span className='font-medium text-lg'>{getProductName()}</span>
        <span className='font-light text-base'> R$ {cart_product.value}</span>
      </div>

      <div className=' flex items-center justify-center'>
        <AiOutlineDelete size={25} fill='red' />
      </div>
    </div>
  );
};
