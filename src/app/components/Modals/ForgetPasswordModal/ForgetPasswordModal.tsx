'use client';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import Image from 'next/image';
import { IoCloseOutline } from 'react-icons/io5';
import { useTheme } from 'next-themes';
import useForgetPasswordModal from '@/app/hooks/modals/useForgetPassword';
import { useState } from 'react';
import useLoginModal from '@/app/hooks/modals/useLoginModal';
import { StyledInput } from '../../Input';
import { recoverPassword } from '@/app/services';

enum STEPS {
  RECEIVE_EMAIL = 0,
  SENDED_EMAIL = 1,
}
export const ForgetPasswordModal = () => {
  const [step, setStep] = useState(STEPS.RECEIVE_EMAIL);

  const forgetPasswordModal = useForgetPasswordModal();
  const loginModal = useLoginModal();
  const { theme } = useTheme();

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      email: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    if (!data.email.includes('@')) return toast.error('Favor inserir email');
    try {
      const object = {
        to: data.email,
      };

      const response = await recoverPassword(object);

      console.log(response);
      if (response.status === 400) {
        return toast.error(response.data.message);
      }
      if (response.status === 201) {
        reset();
        return setStep(STEPS.SENDED_EMAIL);
      } else {
        toast.error('Erro ao enviar o email!');
      }
    } catch (error) {
      toast.error('Erro ao buscar o email');
    }
  };

  const handleOpenLoginModal = () => {
    setStep(STEPS.RECEIVE_EMAIL);
    forgetPasswordModal.onClose();
    loginModal.onOpen();
  };

  let bodyContent = (
    <div className='h-3/5'>
      <div className='flex flex-col w-10/12 mx-auto p-4 h-[60%] sm:h-auto'>
        <div className='flex flex-col py-4 gap-y-3'>
          <h1 className='font-semibold text-3xl text-center'>
            Esqueceu sua senha?
          </h1>
          <p className='font-medium text-xl'>
            Não se preocupe, iremos enviar um email para você redefinir sua
            senha!
          </p>
        </div>

        <div className='flex flex-col gap-y-3 w-full'>
          <StyledInput
            id='email'
            required
            placeholder='Email'
            label='Email'
            register={register}
            type='email'
          />

          <div className='flex flex-col w-full gap-y-4'>
            <button
              className=' bg-red-700 py-2  rounded-md text-white text-lg font-semibold'
              onClick={handleSubmit(onSubmit)}
            >
              Enviar email
            </button>
            <button
              className={`py-2 rounded-md  text-lg font-semibold border-2 ${
                theme === 'light' ? 'border-black' : 'border-white'
              }`}
              onClick={handleOpenLoginModal}
            >
              Voltar
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  let imageContent = (
    <div className='aspect-video w-full h-2/5   relative overflow-hidden rounded-xl'>
      <Image
        fill
        className='sm:object-cover h-1 w-full group-hover:scale-110 transition'
        src='/forget.svg'
        alt='forgetPassword'
      />
    </div>
  );

  if (step === STEPS.SENDED_EMAIL) {
    bodyContent = (
      <div className='h-2/5'>
        <div className='flex flex-col mx-auto p-4  sm:h-auto'>
          <div className='flex flex-col py-4 gap-y-3'>
            <h1 className='font-bold text-3xl'>Email enviado! </h1>
            <p className='font-semibold text-xl'>
              Não se esqueça de verificar na sua caixa de span :)
            </p>
          </div>

          <div className='flex flex-col w-full gap-y-4'>
            <button
              className={`py-2 rounded-md  text-lg font-semibold border-2  my-4 ${
                theme === 'light' ? 'border-black' : 'border-white'
              }`}
              onClick={handleOpenLoginModal}
            >
              Voltar
            </button>
          </div>
        </div>
      </div>
    );

    imageContent = (
      <div className='aspect-video w-full h-3/5   relative overflow-hidden rounded-xl'>
        <Image
          fill
          className='sm:object-cover h-1 w-full group-hover:scale-110 transition'
          src='/email.svg'
          alt='forgetPassword'
        />
      </div>
    );
  }

  return (
    <div
      className={`menuModalsPosition  flex-col gap-12 z-50 ${
        forgetPasswordModal.isOpen ? 'flex' : 'hidden'
      }
${theme === 'light' ? 'bg-white' : 'bg-black'}
      `}
    >
      <div className='flex items-center justify-between ml-5 h-[5%] mt-2'>
        <IoCloseOutline
          size={30}
          onClick={() => {
            forgetPasswordModal.onClose();
            setStep(STEPS.RECEIVE_EMAIL);
          }}
          style={{ cursor: 'pointer' }}
        />
      </div>

      <div className='flex flex-col justify-center items-center'>
        {imageContent}
        {bodyContent}
      </div>
    </div>
  );
};
