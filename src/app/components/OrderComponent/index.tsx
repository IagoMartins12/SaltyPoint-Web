import { OrderComponentType } from '@/app/types/ComponentTypes';
import Image from 'next/image';
import { AiOutlineRight } from 'react-icons/ai';
import { OrderItemCard } from '../OrderItemCard';
import { useCurrentOrderModal } from '@/app/hooks/modals/useProduct';
import useGlobalStore from '@/app/hooks/store/useGlobalStore';
import { formatOrderDate } from '@/app/utils';

export const OrderComponent: React.FC<OrderComponentType> = ({ order }) => {
  const currentOrderModal = useCurrentOrderModal();

  const { states } = useGlobalStore();
  const handleOnClick = () => {
    currentOrderModal.setCurrentProduct(order);
    currentOrderModal.onOpen();
  };

  const getState = () => {
    return (
      states.find(s => s.id === order.state_id)?.state_name ??
      'Status desconhecido'
    );
  };

  const color =
    getState().toUpperCase() === 'ENTREGUE'
      ? 'text-green-500'
      : getState().toUpperCase() === 'CANCELADO'
      ? 'text-red-500'
      : 'text-yellow-500';

  return (
    <div
      className='w-full cardBG rounded-2xl cursor-pointer'
      onClick={handleOnClick}
    >
      <div className='flex flex-col gap-6 p-1 h-full'>
        <div className='w-11/12 mx-auto h-[50%] flex gap-3 items-center justify-between border-b-2 py-4 '>
          <div className='flex gap-3'>
            <div className='w-14 h-14 rounded-full relative'>
              <Image
                fill
                src='/logo.png'
                alt='/logo.png'
                className='rounded-full'
              />
            </div>

            <div className='flex flex-col gap-1 '>
              <span className='font-medium text-xl'>Pizzaria Salty Point</span>
              <span className={`font-light text-sm ${color}`}>
                {getState()}
              </span>
            </div>
          </div>

          <div>
            <AiOutlineRight size={25} />
          </div>
        </div>

        <div className='w-11/12 mx-auto h-[50%] flex  gap-3 items-center justify-between '>
          {order.orderItems.slice(0, 1).map(item => (
            <OrderItemCard
              cart_product={item}
              quantity={order.orderItems.length}
              key={item.id}
            />
          ))}

          <span className='text-sm font-semibold text-center'>
            {formatOrderDate(order.order_date)}
          </span>
        </div>
      </div>
    </div>
  );
};
