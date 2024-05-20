'use client';

import { useChangePasswordModal } from '@/app/hooks/modals/useModal';
import { AuthLoginButton } from '../../Buttons';
import Modal from '../../Modal';
import { PasswordInput } from '../../Input';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { UpdatePasswordDto } from '@/app/types/Dtos';
import { updatedPassword } from '@/app/services';
import Loader from '../../Loader';
import { useState } from 'react';

const ChangePasswordModal = () => {
  const [loading, setLoading] = useState(false);

  const changePasswordModal = useChangePasswordModal();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    if (data.newPassword !== data.confirmNewPassword)
      return toast.error('As senhas não coincidem');

    const object = {
      newPassword: data.newPassword,
    } as UpdatePasswordDto;
    setLoading(true);
    const response = await updatedPassword(object);
    if (response.status === 200) {
      setLoading(false);
      return toast.success('Senha alterada com sucesso');
    } else {
      setLoading(false);
      return toast.error(response.data.message);
    }
  };
  const body = (
    <div className='flex flex-col gap-6 w-11/12 mx-auto'>
      <PasswordInput
        id='newPassword'
        type='password'
        register={register}
        required
        label='Nova senha'
        errors={errors}
      />

      <PasswordInput
        id='confirmNewPassword'
        type='password'
        register={register}
        required
        label='Confirme a nova senha'
        errors={errors}
      />

      <AuthLoginButton
        text={loading ? <Loader isMin /> : 'Alterar'}
        bgColor='bg-red-400'
        onClick={handleSubmit(onSubmit)}
      />
    </div>
  );

  return (
    <>
      <Modal
        onClose={changePasswordModal.onClose}
        body={body}
        isOpen={changePasswordModal.isOpen}
        title='Alterar minha senha'
      />
    </>
  );
};

export default ChangePasswordModal;
