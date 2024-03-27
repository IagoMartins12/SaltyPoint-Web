'use client';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';
import { BsFacebook } from 'react-icons/bs';
import { BiLogInCircle } from 'react-icons/bi';
import { StyledInput, StyledInputPassword } from '../../Input';
import { AuthLoginButton, AuthLoginButtonRounded } from '../../Buttons';
import { AiFillApple } from 'react-icons/ai';
import { LoginUserDto } from '@/app/types/Dtos';
import { googleLogin, loginUser } from '@/app/services';
import useAuth from '@/app/hooks/auth/useAuth';
import Modal from '../../Modal';
import Image from 'next/image';
import {
  useForgetPasswordModal,
  useLoginModal,
  useRegisterModal,
} from '@/app/hooks/modals/useModal';

const LoginModal = () => {
  const loginModal = useLoginModal();
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

  const handleGoogleLogin = async () => {
    console.log('clicou');
    const response = await googleLogin();
  };

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

  const body = (
    <div className='flex flex-col-reverse sm:flex-row justify-around'>
      <div className='flex flex-col w-full sm:w-7/12 lg:w-5/12 p-2'>
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

        <form
          className='flex flex-col gap-y-5 mx-auto w-11/12 '
          onSubmit={handleSubmit(onSubmit)}
        >
          <StyledInput
            id='email'
            required
            placeholder='Email'
            label='Email'
            register={register}
          />
          <StyledInputPassword
            id='password'
            required
            placeholder='Senha'
            label='Senha'
            register={register}
          />
          <div className='flex justify-end my-3'>
            <span
              className=' text-base cursor-pointer underline'
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
              onClick={() => console.log('clicou')}
              submit
            />
            <div className='flex items-center justify-center  '>
              <hr className='w-3/12 mr-2' />
              <span className='text-center'>Ou entre com: </span>
              <hr className='w-3/12 ml-2' />
            </div>
            <div className='flex items-center justify-evenly'>
              <AuthLoginButtonRounded
                text='Continuar com Google'
                icon={FcGoogle}
                bgColor='bg-[#4285F4] '
                onClick={handleGoogleLogin}
              />
              <AuthLoginButtonRounded
                text='Continuar com Facebook'
                icon={BsFacebook}
                bgColor='bg-blue-800 '
                onClick={() => console.log('clicou')}
              />
              <AuthLoginButtonRounded
                text='Continuar com Apple'
                icon={AiFillApple}
                bgColor='bg-black '
                onClick={() => console.log('clicou')}
              />
            </div>
          </div>
        </form>
      </div>
      <div className='w-full sm:w-5/12 lg:w-4/12 relative'>
        <div className='aspect-video w-full h-48 sm:h-4/5 mt-4 sm:mt-10 relative overflow-hidden rounded-xl m-1'>
          <Image
            fill
            className='sm:object-cover -z-10 !static '
            src={`/login.svg`}
            alt={'login.svg'}
            sizes='100%'
          />
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Modal
        onClose={loginModal.onClose}
        body={body}
        isOpen={loginModal.isOpen}
        authModal
      />
    </>
  );
};

export default LoginModal;
