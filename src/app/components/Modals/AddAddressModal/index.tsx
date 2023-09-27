import React, { useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import useAddAddress from '@/app/hooks/modals/useAddAddress';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { getAddressPerCep, sendAddressUser } from '@/app/services';
import toast from 'react-hot-toast';
import { CEPInfoDto } from '@/app/types/Dtos';
import usePrivateStore from '@/app/hooks/store/usePrivateStore';
import { User_Adress } from '@/app/types/ModelsType';
import { GetGeoLocation } from './Geolocation';
import { AddressInfoStep } from './AddressInfoStep';
import { CepStep } from './CepStep';
import { AddressPerGeoLocation } from './AddressPerGeoLocation';
import { Result } from '@/app/types/GeolocationType';
import { checkIfAddressIsValid } from '@/app/utils';

export enum STEPS {
  CEP = 0,
  ADDRESS_INFO = 1,
  GEOLOCATION = 2,
  ADDRESS_PER_GEOLOCATION = 3,
}

export const AddAddressModal = () => {
  const [step, setStep] = useState(STEPS.CEP);
  const [isValid, setIsValid] = useState(false);
  const [isSelected, setIsSelected] = useState<null | number>(null);
  const [result, setResult] = useState<Result | null>(null);

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
      address: '',
      city: '',
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
    const checkAddress = checkIfAddressIsValid(data.district);

    if (!checkAddress)
      return toast.error('Esse endereço não está na nossa área de entrega');

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
      setStep(0);

      addAddress.onClose();
      return toast.success('Endereço criado!');
    } else {
      return toast.error('Erro ao cadastrar endereço');
    }
  };

  const saveGeoAddress: SubmitHandler<FieldValues> = async data => {
    const object = {
      address: data.address,
      cep: data.cep,
      number: data.number,
      reference: data.complement,
      district: data.district,
      city: data.cityGeo,
      uf: data.ufGeo,
      type_adress: isSelected,
    } as User_Adress;

    const response = await sendAddressUser(object);
    if (response.status === 201) {
      setAddress([...address, response.data]);
      setStep(0);
      reset();

      addAddress.onClose();
      return toast.success('Endereço criado!');
    } else {
      return toast.error('Erro ao cadastrar endereço');
    }
  };

  const handleOnChange = (value: string) => {
    setValue('cep', value);
    setIsValid(value.length === 9);
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

      <div className='flex flex-col w-10/12 mx-auto h-full '>
        <div className='flex flex-col gap-4 h-full'>
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

          {step === STEPS.GEOLOCATION && (
            <GetGeoLocation setStep={setStep} setResult={setResult} />
          )}

          {step === STEPS.ADDRESS_PER_GEOLOCATION && (
            <AddressPerGeoLocation
              errors={errors}
              handleSubmit={handleSubmit}
              register={register}
              saveAddress={saveGeoAddress}
              setIsSelected={setIsSelected}
              handleOnChange={handleOnChange}
              result={result}
              setValue={setValue}
            />
          )}
        </div>
      </div>
    </div>
  );
};
