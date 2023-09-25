import React, { useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { AiOutlineQuestionCircle, AiOutlineSearch } from 'react-icons/ai';
import useAddAddress from '@/app/hooks/modals/useAddAddress';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { getAddressPerCep, sendAddressUser } from '@/app/services';
import toast from 'react-hot-toast';
import { CEPInfoDto } from '@/app/types/Dtos';
import { AddressInput, InfoAddressInput } from '../../Input';
import { AddressRadio } from '../../RadioButton';
import { BsHouseFill } from 'react-icons/bs';
import { FaSuitcase } from 'react-icons/fa';
import usePrivateStore from '@/app/hooks/store/usePrivateStore';
import { User_Adress } from '@/app/types/ModelsType';

enum STEPS {
  CEP = 0,
  ADDRESS_INFO = 1,
}

export const AddAddressModal = () => {
  const [step, setStep] = useState(STEPS.CEP);
  const [cepState, setCepState] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [isSelected, setIsSelected] = useState<null | number>(null);

  const addAddress = useAddAddress();
  const { address, setAddress } = usePrivateStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      cep: '',
      district: '',
      number: '',
      complement: '',
      city: '',
      address: '',
      uf: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    const validateCpf = data.cep.replace('-', '');

    const response = await getAddressPerCep(validateCpf);

    if (response?.erro) {
      return toast.error('CEP não encontrado');
    }

    if (response) {
      setStep(STEPS.ADDRESS_INFO);
      // Mapeia os campos do formulário com as propriedades de CEPInfoDto
      const fieldMappings: Record<string, keyof CEPInfoDto> = {
        district: 'bairro',
        city: 'localidade',
        address: 'logradouro',
        uf: 'uf',
      };
      // Define os valores nos campos do formulário após a busca
      Object.keys(fieldMappings).forEach(fieldName => {
        const field = fieldMappings[fieldName];
        if (response[field]) {
          setValue(fieldName, response[field]);
        }
      });
    }
  };

  const saveAddress: SubmitHandler<FieldValues> = async data => {
    const object = {
      address: data.address,
      cep: data.cep,
      number: data.number,
      reference: data.complement,
      district: data.district,
      city: data.city,
      uf: data.uf,
      type_adress: isSelected,
    } as User_Adress;

    const response = await sendAddressUser(object);
    if (response.status === 201) {
      setAddress([...address, object]);
      addAddress.onClose();
      return toast.success('Endereço criado!');
    }
  };

  const handleOnChange = (value: string) => {
    const numericValue = value.replace(/\D/g, '');
    const formattedCep =
      numericValue.length <= 5
        ? numericValue
        : numericValue.slice(0, 5) + '-' + numericValue.slice(5, 8);

    setCepState(formattedCep);
    setIsValid(numericValue.length === 8);
  };

  return (
    <div
      className={`menuModalsPosition rounded-md gap-3 modalsBackground flex-col z-50 flex ${
        addAddress.isOpen ? 'modal-open' : 'modal-closed'
      }`}
    >
      <div className='flex items-center justify-between ml-5 mt-2'>
        <IoCloseOutline
          size={30}
          onClick={() => {
            setStep(0);
            addAddress.onClose();
            reset();
          }}
          style={{ cursor: 'pointer' }}
        />
      </div>

      <div className='flex flex-col w-10/12 mx-auto '>
        <div className='flex flex-col gap-4'>
          <span className='font-semibold text-xl'>Adicionar endereço</span>

          {step === STEPS.CEP && (
            <form
              className='flex flex-col gap-3'
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className='flex flex-col gap-1'>
                <span className='font-light text-sm'>CEP</span>
                <input
                  type='text'
                  id='cep'
                  className={`px-2 py-2 border-b-2 ${
                    errors.cep ? 'border-red-500' : ''
                  }`}
                  placeholder='Exemplo: 05280-000'
                  {...register('cep', {
                    required: true,
                  })}
                  onChange={ev => {
                    handleOnChange(ev.target.value);
                  }}
                />
                {errors.cep && (
                  <span className='text-red-500'>
                    {typeof errors.cep.message === 'string'
                      ? errors.cep.message
                      : 'CEP inválido'}
                  </span>
                )}
              </div>

              <button
                type='submit'
                className={`flex gap-3 items-center justify-center w-full py-2 rounded-lg bg-red-600 text-white ${
                  isValid ? '' : 'opacity-60'
                }`}
                disabled={!isValid}
              >
                <AiOutlineSearch size={25} />
                <span className='font-medium text-lg'>Buscar CEP</span>
              </button>

              <button
                type='submit'
                className={`flex gap-3 items-center justify-center w-full py-2 rounded-lg`}
              >
                <AiOutlineQuestionCircle size={25} />
                <span className='font-medium text-sm'>Não sei meu cep</span>
              </button>
            </form>
          )}

          {step === STEPS.ADDRESS_INFO && (
            <form
              className='flex flex-col gap-3'
              onSubmit={handleSubmit(saveAddress)}
            >
              <div className='flex flex-col gap-3'>
                <AddressInput
                  errors={errors}
                  id='cep'
                  register={register}
                  disabled
                  label='Bairro'
                />

                <AddressInput
                  errors={errors}
                  id='address'
                  register={register}
                  label='Endereço'
                />
                <InfoAddressInput
                  id='number'
                  register={register}
                  required
                  label='Numero'
                />
                <InfoAddressInput
                  id='complement'
                  register={register}
                  label='Complemento'
                  required={false}
                />
                <AddressInput
                  errors={errors}
                  id='district'
                  register={register}
                  disabled
                  label='Bairro'
                />

                <AddressInput
                  errors={errors}
                  id='city'
                  register={register}
                  disabled
                  label='Cidade'
                />

                <AddressInput
                  errors={errors}
                  id='uf'
                  register={register}
                  disabled
                  label='Estado'
                />

                <div className='flex items-center justify-center gap-4 my-3 '>
                  <AddressRadio
                    icon={BsHouseFill}
                    text='Casa'
                    index={0}
                    name='addressType'
                    onChange={(index, name) => {
                      setIsSelected(index);
                    }}
                  />
                  <AddressRadio
                    icon={FaSuitcase}
                    text='Trabalho'
                    index={1}
                    name='addressType'
                    onChange={(index, name) => {
                      setIsSelected(index);
                    }}
                  />
                </div>
                <button
                  type='submit'
                  className={`flex gap-3 items-center justify-center w-full py-2 rounded-lg bg-red-600 text-white `}
                >
                  <span className='font-medium text-lg'>Salvar </span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
