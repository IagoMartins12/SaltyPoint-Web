'use client';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useState } from 'react';
import { StyledInput } from '../../Input';
import { recoverPassword } from '@/app/services';
import {
  useForgetPasswordModal,
  useLoginModal,
} from '@/app/hooks/modals/useModal';
import Modal from '../../Modal';
import { PuffLoader } from 'react-spinners';
import Loader from '../../Loader';

enum STEPS {
  RECEIVE_EMAIL = 0,
  SENDED_EMAIL = 1,
}
const ForgetPasswordModal = () => {
  const [step, setStep] = useState(STEPS.RECEIVE_EMAIL);
  const [loading, setLoading] = useState(false);
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
      setLoading(true);
      const object = {
        to: data.email,
      };

      const response = await recoverPassword(object);
      setLoading(false);
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

  let imageContent = (
    <div className='aspect-video w-full h-2/5 sm:h-3/5  relative overflow-hidden rounded-xl'>
      <Image
        fill
        className='object-cover  sm:px-8 sm:py-4 '
        src={`/forget.svg`}
        alt={'forget.svg'}
        sizes='100%'
      />
    </div>
  );

  let bodyContent = (
    <div className='h-3/5 sm:h-2/5 w-full'>
      <div className='flex flex-col w-11/12 mx-auto  h-full sm:h-auto'>
        <div className='flex flex-col py-4 gap-y-3'>
          <h1 className='font-semibold text-xl text-center'>
            Esqueceu sua senha?
          </h1>
          <p className='font-medium text-lg text-center'>
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
              disabled={loading ? true : false}
              className=' bg-red-400 py-2  rounded-md text-white text-medium font-semibold flex items-center justify-center'
              onClick={handleSubmit(onSubmit)}
            >
              {loading ? <Loader isMin /> : <>Enviar email</>}
            </button>
            <button
              className={`py-2 rounded-md  text-medium font-semibold shadow-md `}
              onClick={handleOpenLoginModal}
            >
              Voltar
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  if (step === STEPS.SENDED_EMAIL) {
    bodyContent = (
      <div className='h-3/5 sm:h-2/5 w-full'>
        <div className='flex flex-col w-11/12 mx-auto  h-full sm:h-auto'>
          <div className='flex flex-col py-4 gap-y-3'>
            <h1 className='font-semibold text-xl text-center'>
              Email enviado!
            </h1>
            <p className='font-medium text-lg text-center'>
              Não se esqueça de verificar na sua caixa de span :)
            </p>
          </div>

          <div className='flex flex-col w-full gap-y-4'>
            <button
              className={`py-2 rounded-md  text-medium font-semibold border-2  my-4 ${
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
      <div className='aspect-video w-full h-4/5 sm:h-3/5  relative overflow-hidden rounded-xl'>
        <Image
          fill
          className='sm:object-cover  !static '
          src={`/email.svg`}
          alt={'forget.svg'}
          sizes='100%'
        />
      </div>
    );
  }

  const body = (
    <>
      <div className='flex flex-col justify-center items-center h-full'>
        {imageContent}
        {bodyContent}
      </div>
    </>
  );
  return (
    <Modal
      onClose={forgetPasswordModal.onClose}
      body={body}
      isOpen={forgetPasswordModal.isOpen}
      title='Esqueci minha senha'
    />
  );
};

export default ForgetPasswordModal;
