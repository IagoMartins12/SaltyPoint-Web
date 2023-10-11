import Modal from '../../Modal';
import { useMyOrderModal } from '@/app/hooks/modals/useModal';
import usePrivateStore from '@/app/hooks/store/usePrivateStore';

export const MyOrdersModal = () => {
  const myOrdersModal = useMyOrderModal();

  const { orders } = usePrivateStore();

  const body = (
    <div className='flex flex-col w-11/12 mx-auto gap-6'>
      <div className=''>
        <div className='flex flex-col gap-6'>
          {orders.map(order => (
            <span key={order.id}>{order.id}</span>
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
        title='Meus pedidos'
      />
    </>
  );
};
