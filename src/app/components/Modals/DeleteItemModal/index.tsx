import useAddress from '@/app/hooks/modals/useAddress';
import useDelete from '@/app/hooks/modals/useDelete';
import usePrivateStore from '@/app/hooks/store/usePrivateStore';
import { deleteAddress } from '@/app/services';
import toast from 'react-hot-toast';
import { RiDeleteBin5Fill } from 'react-icons/ri';

export const DeleteItemModal: React.FC = () => {
  const deleteModal = useDelete();
  const addressModal = useAddress();
  const { address, setAddress, user } = usePrivateStore();

  const handleDeleteAddress = async () => {
    if (deleteModal.currentItem) {
      if (user?.user_Adress_id === deleteModal.currentItem) {
        return toast.error(
          'Não é possível excluir o endereço que está vinculado a sua conta!',
        );
      }
      const response = await deleteAddress(deleteModal.currentItem);

      if (response.status === 200) {
        const updatedAddressList = address.filter(
          address => address.id !== deleteModal.currentItem,
        );
        setAddress(updatedAddressList);
        handleOpenAddressModal();
        return toast.success('Endereço excluido');
      } else {
        return toast.error('Erro ao deletar endereço');
      }
    }
  };

  const handleOpenAddressModal = () => {
    addressModal.onOpen();
    deleteModal.onClose();
  };

  return (
    <div
      className={`deleteModalPosition modalsBackground px flex-col z-[60] px-6 py-8  rounded-lg
        ${deleteModal.isOpen ? 'modal-open' : 'modal-closed'}`}
    >
      <div className='w-full sm:h-1/2 items-center flex justify-center flex-col gap-10'>
        <div className='w-24 h-24 rounded-full bg-red-200 items-center justify-center flex'>
          <RiDeleteBin5Fill size={45} />
        </div>
        <div className='flex flex-col items-center justify-center gap-3'>
          <h3 className='text-2xl font-bold'>Deletar endereço?</h3>
          <span className='text-lg font-medium'>
            Essa ação não pode ser desfeita, tem certeza?
          </span>
        </div>
        <div className='flex gap-4 w-full '>
          <button
            className='w-full py-4 bg-slate-200 rounded-2xl '
            onClick={() => {
              handleOpenAddressModal();
            }}
          >
            <span className='font-semibold text-black text-lg'>Cancelar</span>
          </button>
          <button
            className='w-full py-4 bg-red-500 rounded-2xl'
            onClick={() => {
              handleDeleteAddress();
            }}
          >
            <span className='font-semibold text-white text-lg'>
              Deletar endereço
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
