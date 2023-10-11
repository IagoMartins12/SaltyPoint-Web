import Modal from '../../Modal';
import usePrivateStore from '@/app/hooks/store/usePrivateStore';
import { useCurrentOrderModal } from '@/app/hooks/modals/useProduct';
import { CartProductCardOrder } from '../../CartProductCardOrder';
import { CurrentOrderInfo } from '../../CurrentOrderInfo';

export const CurrentOrderModal = () => {
  const myOrdersModal = useCurrentOrderModal();

  const { orders } = usePrivateStore();

  const currentOrder = orders.filter(
    o => o.id === myOrdersModal.currentProduct?.id,
  );

  const body = (
    <div className='flex flex-col w-11/12 mx-auto gap-6 pb-6'>
      <div className='flex flex-col gap-6'>
        <div>
          {currentOrder.map(order =>
            order.orderItems.map(item => (
              <CartProductCardOrder cart_product={item} key={item.id} />
            )),
          )}
        </div>

        <div>
          {currentOrder.map((order, i) => (
            <CurrentOrderInfo order={order} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
  return (
    <>
      <Modal
        onClose={myOrdersModal.onClose}
        body={body}
        isOpen={myOrdersModal.isOpen}
        title='Meu pedido'
      />
    </>
  );
};
