import React, { useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import useAddAddress from '@/app/hooks/modals/useAddAddress';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { getAddressPerCep, sendAddressUser } from '@/app/services';
import toast from 'react-hot-toast';
import { CEPInfoDto } from '@/app/types/Dtos';
import usePrivateStore from '@/app/hooks/store/usePrivateStore';
import { User_Adress } from '@/app/types/ModelsType';
import { GetGeoLocation } from '../../Geolocation';
import useGeoAddressLocation from '@/app/hooks/store/useGeoAddressLocation';
import { AddressInfoStep } from './AddressInfoStep';
import { CepStep } from './CepStep';

export enum STEPS {
  CEP = 0,
  ADDRESS_INFO = 1,
  GEOLOCATION = 2,
}

export const AddAddressModal = () => {
  const [step, setStep] = useState(STEPS.CEP);
  const [cepState, setCepState] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [isSelected, setIsSelected] = useState<null | number>(null);
  const { GeoAddress } = useGeoAddressLocation();

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
      setAddress([...address, response.data]);
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
            <CepStep
              errors={errors}
              handleOnChange={handleOnChange}
              handleSubmit={handleSubmit}
              isValid={isValid}
              onSubmit={onSubmit}
              register={register}
              setStep={setStep}
            />
          )}

          {step === STEPS.ADDRESS_INFO && (
            <AddressInfoStep
              errors={errors}
              handleSubmit={handleSubmit}
              register={register}
              saveAddress={saveAddress}
              setIsSelected={setIsSelected}
            />
          )}

          {step === STEPS.GEOLOCATION && <GetGeoLocation />}
        </div>
      </div>
    </div>
  );
};
