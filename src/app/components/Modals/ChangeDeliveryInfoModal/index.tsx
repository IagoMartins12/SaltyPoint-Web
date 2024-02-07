import {
  useAddAddress,
  useChangeDeliveryInfoModal,
} from '@/app/hooks/modals/useModal';
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
import { AiOutlinePlus } from 'react-icons/ai';

export const ChangeDeliveryInfoModal = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const [userAddress, setUserAddress] = useState('');

  const changeDeliveryModal = useChangeDeliveryInfoModal();
  const addAddress = useAddAddress();
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

  const isValid = () => {
    const addressLenght = address.filter(
      address => address.isActive === 0,
    ).length;

    if (addressLenght <= 4) return true;

    return false;
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

        {filtedAddress.length > 0 ? (
          <div className='flex flex-col gap-4'>
            {filtedAddress.map((address, i) => (
              <div
                className='flex items-center px-2 py-3 border-b-2 gap-3'
                key={i}
              >
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
                    <span className='text-sm font-light'>
                      {address.reference}
                    </span>
                  )}
                </div>

                <div className='w-2/12 flex items-center justify-center'>
                  <input
                    type='radio'
                    name='deliveryOption'
                    className='accent-red-600 w-4 h-4'
                    defaultChecked={address.id === selected}
                    onClick={() => {
                      setSelected(address.id);
                    }}
                  />
                </div>
              </div>
            ))}

            <div
              className='flex items-center justify-center gap-3 my-3 cursor-pointer'
              onClick={() => {
                isValid()
                  ? addAddress.onOpen()
                  : toast.error('Quantidade maxima de endereços atingida!');
              }}
            >
              <AiOutlinePlus size={25} color='red' fill='red' />
              <span className='font-semibold text-lg text-red-500 hover:text-red-700'>
                Adicionar endereço
              </span>
            </div>
          </div>
        ) : (
          <div className='flex flex-col items-center gap-8 w-full mt-8'>
            <span className='text-xl font-semibold'>
              Você ainda não possui nenhum endereço cadastrado
            </span>

            <div
              className='flex items-center justify-center gap-3 my-3 cursor-pointer'
              onClick={() => {
                isValid()
                  ? addAddress.onOpen()
                  : toast.error('Quantidade maxima de endereços atingida!');
              }}
            >
              <AiOutlinePlus size={25} color='red' fill='red' />
              <span className='font-semibold text-lg text-red-500 hover:text-red-700'>
                Adicionar endereço
              </span>
            </div>
          </div>
        )}
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
