'use client';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { StyledInputPassword } from '../Input';
import { AuthLoginButton } from '../Buttons';
import { BiLogInCircle } from 'react-icons/bi';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { resetPassword, updatedPassword } from '@/app/services';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const ResetPasswordForm = () => {
  const [token, setToken] = useState<null | string>(null);
  const [email, setEmail] = useState<null | string>(null);

  const { register, handleSubmit } = useForm<FieldValues>();

  const router = useRouter();
  const onSubmit: SubmitHandler<FieldValues> = async data => {
    if (!token)
      return toast.error(
        'Token inválido. Peça para enviar o email de redefinição novamente',
      );
    if (!email)
      return toast.error(
        'Email inválido. Peça para enviar o email de redefinição novamente',
      );

    if (data.newPassword !== data.confirmNewPassword)
      return toast.error('As senhas não coincidem');

    const object = {
      newPassword: data.newPassword,
      email,
      token,
    };

    const response = await resetPassword(object);
    if (response.status === 200) {
      toast.success('Senha alterada com sucesso');
      router.push('/');
      return;
    } else {
      return toast.error(response.data.message);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentUrl = window.location.href;
      const urlParams = new URLSearchParams(currentUrl);
      const token = urlParams.get('token');
      const email = urlParams.get('email');

      setToken(token);
      setEmail(email);
    }
  }, []);

  return (
    <div className='w-full sm:w-4/12 h-full sm:h-5/6 modalBG rounded-lg'>
      <div className='flex flex-col items-center justify-center py-4 sm:py-8 px-8  h-full gap-6'>
        <div className='aspect-video w-full h-3/6 sm:h-3/6 relative '>
          <Image
            fill
            className='sm:object-contain  '
            src={`/forgetPassword.svg`}
            alt={'login.svg'}
            sizes='100%'
          />
        </div>
        <form
          className='flex flex-col items-center justify-center  gap-8 w-full'
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className='text-xl font-semibold'>Seja bem vindo de volta!</h1>

          <StyledInputPassword
            id='newPassword'
            required
            placeholder='Senha'
            label='Senha'
            register={register}
          />

          <StyledInputPassword
            id='confirmNewPassword'
            required
            placeholder='Confirme a senha'
            label='Confirme a senha'
            register={register}
          />

          <AuthLoginButton
            text='Redefinir senha'
            icon={BiLogInCircle}
            bgColor='bg-red-400'
            onClick={() => console.log('clicou')}
            submit
          />
        </form>
      </div>
    </div>
  );
};
