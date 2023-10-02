import { useChangePasswordModal } from '@/app/hooks/modals/useModal';
import { AuthLoginButton } from '../../Buttons';
import Modal from '../Modal';
import { PasswordInput } from '../../Input';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { UpdatePasswordDto } from '@/app/types/Dtos';
import { updatedPassword } from '@/app/services';

export const ChangePasswordModal = () => {
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

    const response = await updatedPassword(object);
    if (response.status === 200) {
      return toast.success('Senha alterada com sucesso');
    } else {
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
        text='Alterar senha'
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
        title='Alterar minha senha!'
      />
    </>
  );
};
