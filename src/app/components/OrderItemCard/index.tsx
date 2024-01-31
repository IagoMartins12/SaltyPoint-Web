import useGlobalStore from '@/app/hooks/store/useGlobalStore';
import { OrderProductCardType } from '@/app/types/ComponentTypes';

export const OrderItemCard: React.FC<OrderProductCardType> = ({
  cart_product,
  quantity,
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

  const getQuantity = () => {
    if (quantity > 1) {
      return quantity - 1;
    }

    return null;
  };

  return (
    <div className='w-8/12 flex gap-6'>
      <div className='flex flex-col gap-1 w-full justify-center'>
        <div className='flex items-center gap-2'>
          <div className=' bg-slate-300 w-[20px] h-[22px] rounded-md flex items-center justify-center'>
            <span className='text-sm  font-light'>{cart_product.quantity}</span>
          </div>
          <span className='font-light text-base'>
            {getProductName2(cart_product.product_id, cart_product.size)}
          </span>
        </div>

        <div>
          {quantity > 1 && (
            <span className='font-semibold text-xs'>
              mais {getQuantity()} itens
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
