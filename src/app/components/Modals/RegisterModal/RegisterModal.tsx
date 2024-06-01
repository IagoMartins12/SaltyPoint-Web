'use client';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { BiLogInCircle } from 'react-icons/bi';
import { createUser } from '@/app/services';
import { CreateUserDto } from '@/app/types/Dtos';
import { StyledInput, StyledInputPassword } from '../../Input';
import { AuthLoginButton } from '../../Buttons';
import Image from 'next/image';
import Modal from '../../Modal';
import { useLoginModal, useRegisterModal } from '@/app/hooks/modals/useModal';
import { useState } from 'react';
import Loader from '../../Loader';

const RegisterModal = () => {
  const [loading, setLoading] = useState(false);
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const openLoginModal = () => {
    registerModal.onClose();
    loginModal.onOpen();
  };

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    const createUserDto = data as CreateUserDto;
    setLoading(true);
    const response = await createUser(createUserDto);

    if (response.status === 400) {
      setLoading(false);
      return toast.error(response.data.message);
    } else if (response.status === 201) {
      toast.success('Conta criada com sucesso!');
      reset();
      registerModal.onClose();
      loginModal.onOpen();
      setLoading(false);
    } else {
      setLoading(false);
      toast.error('Erro ao realizar cadastro!');
    }
  };

  const body = (
    <div className='flex flex-col-reverse sm:flex-row-reverse justify-around h-full'>
      <div className='flex flex-col w-full sm:w-7/12 lg:w-5/12 p-2 '>
        <div className='w-11/12 mx-auto sm:mx-0 sm:w-auto'>
          <div>
            <span className='font-bold text-2xl'>Salty </span>
            <span className=' 	text-2xl'>Point</span>
          </div>
          <div className='flex flex-col py-4'>
            <h1 className='font-bold text-xl'>Seja bem vindo</h1>
            <p className='font-medium text-xl'>
              Já é inscrito? {''}
              <span
                className=' text-xl cursor-pointer underline'
                onClick={() => {
                  openLoginModal();
                }}
              >
                Faça o login
              </span>
            </p>
          </div>
        </div>

        <div className='flex flex-col gap-y-5 mx-auto w-11/12 '>
          <StyledInput
            id='name'
            required
            placeholder='Nome:'
            label='Nome:'
            register={register}
          />

          <StyledInput
            id='email'
            required
            placeholder='Email:'
            label='Email:'
            register={register}
            type='email'
          />

          <StyledInputPassword
            id='password'
            required
            placeholder='Senha'
            label='Senha'
            register={register}
          />

          <div className='flex flex-col w-full gap-y-4 mt-2'>
            <AuthLoginButton
              text={loading ? <Loader isMin /> : 'Cadastrar'}
              icon={loading ? null : BiLogInCircle}
              bgColor='bg-red-400'
              onClick={handleSubmit(onSubmit)}
              disabled={loading ? true : false}
            />
          </div>
        </div>
      </div>
      <div className='w-full sm:w-5/12 lg:w-4/12'>
        <div className='aspect-video w-full h-64 sm:h-4/5 mt-4 sm:mt-10 relative overflow-hidden rounded-xl m-1'>
          <Image
            fill
            className='sm:object-cover -z-10 !static '
            src={`/register.svg`}
            alt={'register.svg'}
            sizes='100%'
          />
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Modal
        onClose={registerModal.onClose}
        body={body}
        isOpen={registerModal.isOpen}
        authModal
      />
    </>
  );
};

export default RegisterModal;
