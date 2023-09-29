import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Modal from '../Modal';
import { AddressInput, PhoneInput } from '../../Input';
import usePrivateStore from '@/app/hooks/store/usePrivateStore';
import { useEffect } from 'react';
import ProfileImage from '../../UserImage';
import toast from 'react-hot-toast';
import { SelectAddress } from '../../Selects';
import { AuthLoginButton } from '../../Buttons';
import { UpdateUserDto } from '@/app/types/Dtos';
import { updatedMe } from '@/app/services';
import { formatPhoneNumberUser } from '@/app/utils';
import { User } from '@/app/types/ModelsType';
import { useUserInfoModal } from '@/app/hooks/modals/useModal';

export const UserInfoModal = () => {
  const UserInfoModal = useUserInfoModal();
  const { user, address, setUser } = usePrivateStore();

  const setUserWithCallback = (callback: (user: User) => User) => {
    if (!user) return;

    // Call the callback function to update the user object
    const updatedUser = callback(user);

    // Update the user state
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

    const object = {
      name: data.name,
      phone: data.phone,
      user_Adress_id: data.address,
    } as UpdateUserDto;

    try {
      const response = await updatedMe(object);

      // Update the user object with the new phone and address
      setUserWithCallback(oldUser => ({
        ...oldUser,
        phone: response.phone,
        user_Adress_id: data.address,
        name: data.name,
      }));

      toast.success('Perfil atualizado com sucesso!');
    } catch (error) {
      // Handle errors here
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
      const response = await updatedMe(object);

      setUser({ ...user, image: value });
      toast.success('Foto atualizada!');
    } catch (error) {
      // Handle errors here
      console.error(error);
      toast.error('Erro ao atualizar foto.');
    }
  };

  useEffect(() => {
    setValue('name', user?.name);
    setValue('email', user?.email);
    setValue('phone', formatPhoneNumberUser(user?.phone || ''));
    setValue('userImage', user?.image);
  }, [user]);

  const body = (
    <form
      className='flex flex-col gap-6 w-11/12 mx-auto'
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
        address={address}
        userAddressId={user?.user_Adress_id}
      />

      <div className='flex flex-col gap-1'>
        <AuthLoginButton
          text='Alterar'
          bgColor='bg-red-400'
          onClick={handleSubmit(onSubmit)}
        />

        <div className='flex items-center justify-center cursor-pointer'>
          <span className='text-sm font-light text-red-600'>Alterar senha</span>
        </div>

        <div className='flex items-center cursor-pointer justify-center'>
          <span className='text-sm font-light text-red-600'>
            Deletar minha conta
          </span>
        </div>
      </div>
    </form>
  );

  return (
    <>
      <Modal
        onClose={UserInfoModal.onClose}
        body={body}
        title='Minha conta'
        isOpen={UserInfoModal.isOpen}
      />
    </>
  );
};
