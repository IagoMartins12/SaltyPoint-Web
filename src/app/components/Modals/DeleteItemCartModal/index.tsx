'use client';
import usePrivateStore from '@/app/hooks/store/usePrivateStore';
import { removeCartProduct } from '@/app/services';
import toast from 'react-hot-toast';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { DeleteModal } from '../../ModalDelete';
import { useDeleteCartItem } from '@/app/hooks/modals/useDelete';
import { RemoveCartProductDto } from '@/app/types/Dtos';

const DeleteItemCartModal: React.FC = () => {
  const deleteModal = useDeleteCartItem();
  const { cart_product, setCart_product } = usePrivateStore();

  const handleDeleteAddress = async () => {
    if (deleteModal.currentItem) {
      const response = await removeCartProduct({
        cart_product_id: deleteModal.currentItem,
      } as RemoveCartProductDto);

      if (response.status === 200) {
        const updateCart = cart_product.filter(
          cartProduct => cartProduct.id !== deleteModal.currentItem,
        );
        setCart_product(updateCart);
        handleOpenAddressModal();
        return toast.success('Produto excluido');
      } else {
        return toast.error('Erro ao deletar produto');
      }
    }
  };

  const handleOpenAddressModal = () => {
    deleteModal.onClose();
  };

  const body = (
    <>
      <div className='w-full items-center flex justify-center flex-col gap-10'>
        <div className='w-24 h-24 rounded-full bg-red-200 items-center justify-center flex'>
          <RiDeleteBin5Fill size={45} />
        </div>
        <div className='flex flex-col items-center justify-center gap-3'>
          <h3 className='text-2xl font-bold'>Deletar produto?</h3>
          <span className='text-base sm:text-lg font-medium'>
            Essa ação não pode ser desfeita, tem certeza?
          </span>
        </div>
        <div className='flex gap-4 w-full '>
          <button
            className='w-full py-3 bg-slate-200 rounded-2xl '
            onClick={() => {
              handleOpenAddressModal();
            }}
          >
            <span className='font-semibold text-black text-sm sm:text-lg'>
              Cancelar
            </span>
          </button>
          <button
            className='w-full py-3 bg-red-500 rounded-2xl'
            onClick={() => {
              handleDeleteAddress();
            }}
          >
            <span className='font-semibold text-white text-sm sm:text-lg'>
              Deletar produto
            </span>
          </button>
        </div>
      </div>
    </>
  );

  return (
    <DeleteModal
      onClose={deleteModal.onClose}
      body={body}
      isOpen={deleteModal.isOpen}
    />
  );
};

export default DeleteItemCartModal;
