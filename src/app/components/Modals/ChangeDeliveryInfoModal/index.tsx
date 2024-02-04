import { useChangeDeliveryInfoModal } from '@/app/hooks/modals/useModal';
import { ModalWarning } from '../../ModalWarning';
import usePrivateStore from '@/app/hooks/store/usePrivateStore';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { UpdateUserDto } from '@/app/types/Dtos';
import { updatedMe } from '@/app/services';
import { User } from '@/app/types/ModelsType';
import { useEffect, useState } from 'react';
import { formatPhoneNumberUser } from '@/app/utils';
import { AuthLoginButton } from '../../Buttons';
import { PhoneInput } from '../../Input';
import { BsFillHouseDoorFill } from 'react-icons/bs';
import { FaSuitcase } from 'react-icons/fa';

export const ChangeDeliveryInfoModal = () => {
  const [selected, setSelected] = useState<string | null>(null);

  const changeDeliveryModal = useChangeDeliveryInfoModal();
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
  } = useForm<FieldValues>({
    defaultValues: {
      phone: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    if (!user) return;
    if (data.phone.length !== 15 && data.phone)
      return toast.error('Insira um numero valido');

    const object = {
      phone: data.phone,
      user_Adress_id: selected,
    } as UpdateUserDto;

    const userObject = {
      phone: user.phone,
      user_Adress_id: user.user_Adress_id,
    };

    if (
      object.phone === userObject.phone &&
      object.user_Adress_id === userObject.user_Adress_id
    ) {
      return changeDeliveryModal.onClose();
    }

    console.log('object', object);

    try {
      await updatedMe(object);

      setUserWithCallback(oldUser => ({
        ...oldUser,
        phone: data.phone !== '' ? data.phone : user.phone,
        user_Adress_id: selected,
      }));

      toast.success('Perfil atualizado com sucesso!');
      return changeDeliveryModal.onClose();
    } catch (error) {
      // Handle errors here
      console.error(error);
      toast.error('Erro ao atualizar o perfil.');
    }
  };

  useEffect(() => {
    setValue('phone', formatPhoneNumberUser(user?.phone || ''));
    if (user) {
      //@ts-ignore
      setSelected(user.user_Adress_id);
    }
  }, [user]);

  const body = (
    <div className='flex flex-col gap-12 w-11/12 mx-auto Z-50'>
      <div className='flex flex-col gap-2'>
        <span className='text-center text-xl font-semibold'>Contato: </span>
        <PhoneInput
          errors={errors}
          id='phone'
          register={register}
          label='Telefone'
        />
      </div>

      <div className='flex flex-col gap-2'>
        <span className='text-center text-xl font-semibold'>Endereço: </span>

        {filtedAddress.map((address, i) => (
          <div className='flex items-center px-2 py-3 border-b-2 gap-3' key={i}>
            <div className='w-2/12 flex items-center justify-center'>
              {address.type_adress === 0 ? (
                <BsFillHouseDoorFill size={30} />
              ) : (
                <FaSuitcase size={30} />
              )}
            </div>

            <div className='w-8/12 flex flex-col'>
              <span className='font-medium text-lg'>
                {address.type_adress === 0 ? 'Casa' : 'Trabalho'}
              </span>
              <span className='text-sm font-light'>
                {address.address}, {address.number}
              </span>
              <span className='text-sm font-light'>{address.district}</span>
              <span className='text-sm font-light'>
                {address.city} / {address.uf}
              </span>

              {address.reference && (
                <span className='text-sm font-light'>{address.reference}</span>
              )}
            </div>

            <div className='w-2/12 flex items-center justify-center'>
              <input
                type='radio'
                name='deliveryOption'
                className='accent-red-600 w-4 h-4'
                defaultChecked={address.id === user?.user_Adress_id}
                onClick={() => {
                  setSelected(address.id);
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className='flex flex-col gap-1'>
        <AuthLoginButton
          text='Alterar'
          bgColor='bg-red-400'
          onClick={handleSubmit(onSubmit)}
        />
      </div>
    </div>
  );

  return (
    <>
      <ModalWarning
        onClose={changeDeliveryModal.onClose}
        body={body}
        isOpen={changeDeliveryModal.isOpen}
      />
    </>
  );
};
