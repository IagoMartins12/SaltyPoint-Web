'use client';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import useRegisterModal from '@/app/hooks/modals/useRegisterModal';
import useLoginModal from '@/app/hooks/modals/useLoginModal';
import { toast } from 'react-hot-toast';
import Image from 'next/image';
import { IoCloseOutline } from 'react-icons/io5';
import { FcGoogle } from 'react-icons/fc';
import { BsFacebook } from 'react-icons/bs';
import { BiLogInCircle } from 'react-icons/bi';
import useForgetPasswordModal from '@/app/hooks/modals/useForgetPassword';
import { StyledInput } from '../../Input';
import { AuthLoginButton } from '../../Buttons';
import { AiFillApple } from 'react-icons/ai';
import { LoginUserDto } from '@/app/types/Dtos';
import { loginUser } from '@/app/services';
import useAuth from '@/app/hooks/auth/useAuth';
import { useTheme } from 'next-themes';

export const LoginModal = () => {
  const loginModal = useLoginModal();
  const { theme } = useTheme();
  const registerModal = useRegisterModal();
  const forgetPasswordModal = useForgetPasswordModal();
  const auth = useAuth();

  const handleOpenRegisterModal = () => {
    loginModal.onClose();
    registerModal.onOpen();
  };

  const handleOpenForgetPasswordModal = () => {
    loginModal.onClose();
    forgetPasswordModal.onOpen();
  };

  const setUserLocalStorage = (acessToken: string) => {
    auth.setToken(acessToken);
    localStorage.setItem('secret', JSON.stringify(acessToken));
    auth.setIsLogged();
  };

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    const loginUserDto = data as LoginUserDto;
    const response = await loginUser(loginUserDto);

    if (response.status === 400 || response.status === 401) {
      return toast.error(response.data.message);
    } else if (response.status === 200) {
      toast.success('Login feito com sucesso!');
      setUserLocalStorage(response.data.access_token);
      reset();
      loginModal.onClose();
    } else {
      toast.error('Erro ao realizar login!');
    }
  };

  return (
    <div
      className={`modalPosition ${loginModal.isOpen ? 'flex' : 'hidden'} ${
        theme === 'light' ? 'bg-white' : 'bg-black'
      }   flex-col z-50 `}
    >
      <div className='flex items-center justify-between ml-5 mt-2'>
        <IoCloseOutline
          size={30}
          onClick={() => loginModal.onClose()}
          style={{ cursor: 'pointer' }}
        />
      </div>

      <div className='flex flex-col-reverse sm:flex-row justify-around'>
        <div className='flex flex-col w-full sm:w-7/12 lg:w-5/12 p-4'>
          <div className='w-11/12 mx-auto sm:mx-0 sm:w-auto'>
            <div>
              <span className='font-bold text-2xl'>Salty </span>
              <span className=' 	text-2xl'>Point</span>
            </div>
            <div className='flex flex-col py-4'>
              <h1 className='font-bold text-xl'>Bem vindo de volta</h1>
              <p className='font-medium text-xl'>
                Não é inscrito? {''}
                <span
                  className='text-xl cursor-pointer underline'
                  onClick={() => {
                    handleOpenRegisterModal();
                  }}
                >
                  Crie sua conta
                </span>
              </p>
            </div>
          </div>

          <div className='flex flex-col gap-y-3 mx-auto w-11/12 '>
            <StyledInput
              id='email'
              required
              placeholder='Email'
              label='Email'
              register={register}
            />
            <StyledInput
              type='password'
              id='password'
              required
              placeholder='Senha'
              label='Senha'
              register={register}
            />
            <div className='flex justify-end my-3'>
              <span
                className='text-black text-base cursor-pointer underline'
                onClick={handleOpenForgetPasswordModal}
              >
                Esqueci minha senha
              </span>
            </div>
            <div className='flex flex-col w-full gap-y-4'>
              <AuthLoginButton
                text='Entrar'
                icon={BiLogInCircle}
                bgColor='bg-red-400'
                onClick={handleSubmit(onSubmit)}
              />
              <div className='flex items-center justify-center  '>
                <hr className='w-3/12 mr-2' />
                <span className='text-center'>Ou entre com: </span>
                <hr className='w-3/12 ml-2' />
              </div>
              <AuthLoginButton
                text='Continuar com Google'
                icon={FcGoogle}
                bgColor='bg-[#4285F4] '
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
              className='sm:object-cover h-1 w-full group-hover:scale-110 transition'
              src='/login.svg'
              alt='login'
            />
          </div>
        </div>
      </div>
    </div>
  );
};
