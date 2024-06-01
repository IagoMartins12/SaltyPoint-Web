'use client';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Modal from '../../Modal';
import { AddressInput, PhoneInput } from '../../Input';
import usePrivateStore from '@/app/hooks/store/usePrivateStore';
import { useEffect, useState } from 'react';
import ProfileImage from '../../UserImage';
import toast from 'react-hot-toast';
import { SelectAddress } from '../../Selects';
import { AuthLoginButton } from '../../Buttons';
import { UpdateUserDto } from '@/app/types/Dtos';
import { updatedMe } from '@/app/services';
import { formatPhoneNumberUser } from '@/app/utils';
import { User } from '@/app/types/ModelsType';
import {
  useChangePasswordModal,
  useDeleteUser,
  useUserInfoModal,
} from '@/app/hooks/modals/useModal';
import Loader from '../../Loader';
import SkeletonProfile from '../../Skeletons/SkeletonProfile';

const UserInfoModal = () => {
  const [loading, setLoading] = useState(false);

  const userInfoModal = useUserInfoModal();
  const changePasswordModal = useChangePasswordModal();
  const deleteModal = useDeleteUser();

  const { user, address, setUser } = usePrivateStore();

  const filtedAddress = address.filter(address => address.isActive !== 1);

  const setUserWithCallback = (callback: (user: User) => User) => {
    if (!user) return;

    const updatedUser = callback(user);

    setUser(updatedUser);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    if (!user) return;
    if (data.phone.length !== 15 && data.phone)
      return toast.error('Insira um numero valido');

    setLoading(true);

    const object = {
      name: data.name,
      phone: data.phone !== '' ? data.phone : null,
      user_Adress_id: data.address !== '' ? data.address : null,
    } as UpdateUserDto;
    try {
      await updatedMe(object);
      setLoading(false);

      setUserWithCallback(oldUser => ({
        ...oldUser,
        phone: data.phone !== '' ? data.phone : null,
        user_Adress_id: data.address !== '' ? data.address : null,
        name: data.name,
      }));

      toast.success('Perfil atualizado com sucesso!');
    } catch (error) {
      setLoading(false);
      console.error(error);
      toast.error('Erro ao atualizar o perfil.');
    }
  };

  const userImage = watch('userImage');
  const setCustomValue = async (id: string, value: string) => {
    if (!user) return;

    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });

    const object = {
      image: value,
    } as UpdateUserDto;

    try {
      await updatedMe(object);
      setUser({ ...user, image: value });
      toast.success('Foto atualizada!');
    } catch (error) {
      // Handle errors here
      console.error(error);
      toast.error('Erro ao atualizar foto.');
    }
  };

  let body = (
    <form
      className='flex flex-col gap-6 w-11/12 mx-auto Z-50'
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className='flex items-center justify-center'>
        <ProfileImage
          onChange={value => setCustomValue('userImage', value)}
          value={userImage ?? '/user.png'}
        />
      </div>
      <AddressInput
        errors={errors}
        id='name'
        register={register}
        label='Nome completo'
      />

      <AddressInput
        errors={errors}
        id='email'
        register={register}
        label='E-mail (Não pode ser alterado)'
        disabled
      />

      <PhoneInput
        errors={errors}
        id='phone'
        register={register}
        label='Telefone'
      />

      <SelectAddress
        id='address'
        register={register}
        address={filtedAddress}
        userAddressId={user?.user_Adress_id}
      />

      <div className='flex flex-col gap-1'>
        <AuthLoginButton
          text={loading ? <Loader isMin /> : 'Alterar'}
          bgColor='bg-red-400'
          onClick={handleSubmit(onSubmit)}
          disabled={loading ? true : false}
        />

        <div
          className='flex items-center justify-center cursor-pointer'
          onClick={() => {
            changePasswordModal.onOpen();
          }}
        >
          <span className='text-sm font-light text-red-600'>Alterar senha</span>
        </div>

        <div
          className='flex items-center cursor-pointer justify-center'
          onClick={() => {
            deleteModal.onOpen();
          }}
        >
          <span className='text-sm font-light text-red-600'>
            Deletar minha conta
          </span>
        </div>
      </div>
    </form>
  );

  useEffect(() => {
    setValue('name', user?.name);
    setValue('email', user?.email);
    setValue('phone', formatPhoneNumberUser(user?.phone || ''));
    setValue('userImage', user?.image);
  }, [user, setValue]);

  if (!user) {
    body = <SkeletonProfile />;
  }

  return (
    <>
      <Modal
        onClose={userInfoModal.onClose}
        body={body}
        title='Minha conta'
        isOpen={userInfoModal.isOpen}
      />
    </>
  );
};

export default UserInfoModal;
