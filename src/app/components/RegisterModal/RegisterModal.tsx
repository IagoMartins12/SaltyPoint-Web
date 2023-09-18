'use client';

import { IoCloseOutline } from 'react-icons/io5';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import useRegisterModal from '@/app/hooks/modals/useRegisterModal';
import useLoginModal from '@/app/hooks/modals/useLoginModal';
import { toast } from 'react-hot-toast';
import Image from 'next/image';
import axios from 'axios';
import { StyledInput } from '../Input';
import { AuthLoginButton } from '../Buttons';
import { FcGoogle } from 'react-icons/fc';
import { BsFacebook } from 'react-icons/bs';
import { AiFillApple } from 'react-icons/ai';
import { BiLogInCircle } from 'react-icons/bi';
import { signup } from './signUp';

export const RegisterModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const isOpen = registerModal.isOpen;

  const openLoginModal = () => {
    console.log('clicou');
    registerModal.onClose();
    loginModal.onOpen();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = data => {
    console.log(data);
    // axios
    //   .post('/api/register', data)
    //   .then(() => {
    //     toast.success('Cadastro feito com sucesso');
    //     reset();
    //     loginModal.onOpen();
    //     registerModal.onClose();
    //   })
    //   .catch(error => {
    //     if (error.response.status === 400)
    //       return toast.error('Email ja cadastrado');
    //     if (error.response.status === 401)
    //       return toast.error('Nome de usuario já existe');

    //     toast.error('Algo deu errado! Tente novamente');
    //   });
  };

  return (
    <div
      className={`modalPosition bg-white border-2 flex-col z-50 ${
        isOpen ? 'flex' : 'hidden'
      }
      `}
    >
      <div className='flex items-center justify-between ml-5 mt-2'>
        <IoCloseOutline
          size={30}
          onClick={() => registerModal.onClose()}
          style={{ cursor: 'pointer' }}
        />
      </div>

      <div className='flex flex-col-reverse sm:flex-row-reverse justify-around'>
        <div className='flex flex-col w-full sm:w-7/12 lg:w-5/12 p-4'>
          <div className='w-11/12 mx-auto sm:mx-0 sm:w-auto'>
            <div>
              <span className='font-bold text-2xl'>Salty </span>
              <span className=' text-black	text-2xl'>Point</span>
            </div>
            <div className='flex flex-col py-4'>
              <h1 className='font-bold text-xl'>Seja bem vindo</h1>
              <p className='font-medium text-xl'>
                Já é inscrito? {''}
                <span
                  className='text-black text-xl cursor-pointer underline'
                  onClick={() => {
                    openLoginModal();
                  }}
                >
                  Faça o login
                </span>
              </p>
            </div>
          </div>

          <div className='flex flex-col gap-y-3 mx-auto w-11/12 '>
            <StyledInput
              id='username'
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
            />

            <StyledInput
              type='password'
              id='password'
              required
              placeholder='Senha:'
              label='Senha:'
              register={register}
            />

            <div className='flex flex-col w-full gap-y-4 mt-2'>
              <AuthLoginButton
                text='Cadastrar'
                icon={BiLogInCircle}
                bgColor='bg-red-400'
                onClick={handleSubmit(onSubmit)}
              />
              <div className='flex items-center justify-center'>
                <hr className='w-3/12 mr-2' />
                <span className='text-center'>Ou se registre com: </span>
                <hr className='w-3/12 ml-2' />
              </div>

              <AuthLoginButton
                text='Continuar com Google'
                icon={FcGoogle}
                bgColor='bg-[#4285F4]'
                onClick={() => console.log('clicou')}
              />
              <AuthLoginButton
                text='Continuar com Facebook'
                icon={BsFacebook}
                bgColor='bg-blue-800 '
                onClick={() => console.log('clicou')}
              />
              <AuthLoginButton
                text='Continuar com Apple'
                icon={AiFillApple}
                bgColor='bg-black '
                onClick={() => console.log('clicou')}
              />
            </div>
          </div>
        </div>
        <div className='w-full sm:w-5/12 lg:w-4/12'>
          <div className='aspect-video w-full h-48 sm:h-4/5 mt-4 sm:mt-10 relative overflow-hidden rounded-xl m-1'>
            <Image
              fill
              className=' h-1 w-full group-hover:scale-110 transition'
              src='/register.svg'
              alt='register'
            />
          </div>
        </div>
      </div>
    </div>
  );
};
