'use client';

import { useDeleteUser, useUserInfoModal } from '@/app/hooks/modals/useModal';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { DeleteModal } from '../../ModalDelete';
import { deleteMe } from '@/app/services';
import toast from 'react-hot-toast';
import useAuth, { removeToken } from '@/app/hooks/auth/useAuth';

const DeleteUserModal: React.FC = () => {
  const deleteModal = useDeleteUser();
  const userModal = useUserInfoModal();
  const auth = useAuth();

  const handleDeleteAddress = async () => {
    const response = await deleteMe();

    if (response.status === 200) {
      toast.success('Conta deletada');
      close();
      window.location.reload();
      removeToken();
      auth.setLogout();
    } else {
      toast.error('Erro ao deletar conta');
    }
  };

  const close = () => {
    setTimeout(() => {
      deleteModal.onClose();
    }, 300);
  };

  const handleOpenAddressModal = () => {
    setTimeout(() => {
      deleteModal.onClose();
    }, 300);

    userModal.onOpen();
    deleteModal.onClose();
  };

  const body = (
    <>
      <div className='w-full items-center flex justify-center flex-col gap-10'>
        <div className='w-24 h-24 rounded-full bg-red-200 items-center justify-center flex'>
          <RiDeleteBin5Fill size={45} />
        </div>
        <div className='flex flex-col items-center justify-center gap-3'>
          <h3 className='text-2xl font-bold'>Deletar Conta?</h3>
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
              Deletar Conta
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

export default DeleteUserModal;
