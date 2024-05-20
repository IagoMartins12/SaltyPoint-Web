'use client';

import Modal from '../../Modal';
import { useMyOrderModal } from '@/app/hooks/modals/useModal';
import usePrivateStore from '@/app/hooks/store/usePrivateStore';
import { OrderComponent } from '../../OrderComponent';
import { AnimationEmpty } from '../../Animations/AnimationEmpty';

const MyOrdersModal = () => {
  const myOrdersModal = useMyOrderModal();

  const { orders } = usePrivateStore();

  const sortedOrders = [...orders].sort(
    (a, b) =>
      new Date(b.order_date).getTime() - new Date(a.order_date).getTime(),
  );

  const body = (
    <div className='flex flex-col w-11/12 mx-auto gap-6 pb-6'>
      <div className='flex flex-col gap-6'>
        {sortedOrders.length > 0 ? (
          sortedOrders.map(order => (
            <OrderComponent key={order.id} order={order} />
          ))
        ) : (
          <AnimationEmpty text='Você ainda não fez nenhum pedido' />
        )}
      </div>
    </div>
  );
  return (
    <>
      <Modal
        onClose={myOrdersModal.onClose}
        body={body}
        isOpen={myOrdersModal.isOpen}
        title='Meus pedidos'
      />
    </>
  );
};

export default MyOrdersModal;
