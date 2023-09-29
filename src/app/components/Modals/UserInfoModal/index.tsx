import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Modal from '../Modal';
import useUserInfoModal from '@/app/hooks/modals/useUserInfoModal';
import { AddressInput, PhoneInput } from '../../Input';
import usePrivateStore from '@/app/hooks/store/usePrivateStore';
import { useEffect } from 'react';
import ProfileImage from '../../UserImage';
import toast from 'react-hot-toast';
import { SelectAddress } from '../../Selects';
import { AuthLoginButton } from '../../Buttons';

export const UserInfoModal = () => {
  const userInfoModal = useUserInfoModal();
  const { user, address, setUser } = usePrivateStore();

  const checkAddress = () => {
    return address.find(a => a.id === user?.user_Adress_id);
  };

  const formatPhoneNumber = (phoneNumber: string) => {
    // Remove todos os caracteres não numéricos
    const numericPhoneNumber = phoneNumber.replace(/\D/g, '');

    // Aplica o regex para formatar como (xx) xxxxx-xxxx
    return numericPhoneNumber.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
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

  const onSubmit: SubmitHandler<FieldValues> = async data => {};

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
    };

    setUser({ ...user, image: value });
    toast.success('Foto atualizada!');
  };

  useEffect(() => {
    setValue('name', user?.name);
    setValue('email', user?.email);
    setValue('phone', formatPhoneNumber(user?.phone || ''));
  }, [user]);

  const body = (
    <div className='flex flex-col gap-6 w-11/12 mx-auto'>
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
    </div>
  );

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
