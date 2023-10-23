import Modal from '../../Modal';
import usePrivateStore from '@/app/hooks/store/usePrivateStore';
import { useCurrentOrderModal } from '@/app/hooks/modals/useProduct';
import { CartProductCardOrder } from '../../CartProductCardOrder';
import { CurrentOrderInfo } from '../../CurrentOrderInfo';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { addCartProduct } from '@/app/services';
import { CartProductDto } from '@/app/types/Dtos';
import toast from 'react-hot-toast';
import { useState } from 'react';
import Loader from '../../Loader';

export const CurrentOrderModal = () => {
  const [loading, setLoading] = useState(false);
  const myOrdersModal = useCurrentOrderModal();

  const { orders, cart_product, setCart_product } = usePrivateStore();

  const currentOrder = orders.filter(
    o => o.id === myOrdersModal.currentProduct?.id,
  );

  const handleRepeatOrder = async () => {
    let success = true; // Variável de controle para verificar se tudo ocorreu bem
    const updatedCartProduct = [...cart_product]; // Novo array temporário
    setLoading(true);

    for (const product of currentOrder[0].orderItems) {
      try {
        const response = await addCartProduct(product as CartProductDto);

        updatedCartProduct.push(response); // Adiciona o produto ao novo array temporário
        console.log('response', response);
      } catch (error) {
        toast.error('Erro ao adicionar produto');
        success = false; // Define a variável de sucesso como false em caso de erro
      }
    }

    if (success) {
      setCart_product(updatedCartProduct); // Atualiza o estado com o novo array temporário
      toast.success('Produtos adicionados com sucesso');
      myOrdersModal.onClose();
    }

    setLoading(false);
  };

  let body = (
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

      <button
        className='w-full py-3 px-2 rounded-2xl bg-red-400 flex items-center justify-center gap-6'
        onClick={handleRepeatOrder}
      >
        <AiOutlineShoppingCart size={25} />
        Repetir pedido{' '}
      </button>
    </div>
  );

  if (loading) {
    body = <Loader />;
  }

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
