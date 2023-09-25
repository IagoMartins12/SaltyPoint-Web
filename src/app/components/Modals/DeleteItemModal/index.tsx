import useDelete from '@/app/hooks/modals/useDelete';
import { deleteAddress } from '@/app/services';
import toast from 'react-hot-toast';

export const DeleteItemModal: React.FC = () => {
  const deleteModal = useDelete();
  const handleDeleteAddress = async () => {
    if (deleteModal.currentItem) {
      const response = await deleteAddress(deleteModal.currentItem);

      if (response.status === 200) {
        return toast.success('Endereço excluido');
      } else {
        return toast.error('Erro ao deletar endereço');
      }
    }
  };

  return (
    <div
      className={`deleteModalPosition flex-col z-[60] px-5 py-3  rounded-lg
        ${deleteModal.isOpen ? 'flex' : 'hidden'}`}
    >
      <div className='w-full sm:h-1/2 items-center flex justify-center flex-col gap-y-4'>
        <div className='flex mt-4'>
          <h3 className='text-2xl font-bold'>Deletar este endereço?</h3>
        </div>
        <div className='flex gap-8 flex-col w-full '>
          <button
            className='w-full py-4 bg-red-500'
            onClick={() => {
              handleDeleteAddress();
            }}
          >
            Deletar
          </button>
          <button
            className='modalButton'
            onClick={() => {
              deleteModal.onClose();
            }}
          >
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
};
