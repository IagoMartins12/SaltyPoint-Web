'use client';

import React, { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { getAddressPerCep, sendAddressUser, updatedMe } from '@/app/services';
import toast from 'react-hot-toast';
import { CEPInfoDto, UpdateUserDto } from '@/app/types/Dtos';
import usePrivateStore from '@/app/hooks/store/usePrivateStore';
import { User, User_Adress } from '@/app/types/ModelsType';
import { GetGeoLocation } from './Geolocation';
import { AddressInfoStep } from './AddressInfoStep';
import { CepStep } from './CepStep';
import { AddressPerGeoLocation } from './AddressPerGeoLocation';
import { Result } from '@/app/types/GeolocationType';
import { checkIfAddressIsValid } from '@/app/utils';
import Modal from '../../Modal';
import { useAddAddress } from '@/app/hooks/modals/useModal';

export enum STEPS {
  CEP = 0,
  ADDRESS_INFO = 1,
  GEOLOCATION = 2,
  ADDRESS_PER_GEOLOCATION = 3,
}

const AddAddressModal = () => {
  const [step, setStep] = useState(STEPS.CEP);
  const [isValid, setIsValid] = useState(false);
  const [isSelected, setIsSelected] = useState<null | number>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);
  const addAddress = useAddAddress();
  const { address, setAddress, user, setUser } = usePrivateStore();

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

  const setUserWithCallback = (callback: (user: User) => User) => {
    if (!user) return;

    const updatedUser = callback(user);

    setUser(updatedUser);
  };

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    const validateCpf = data.cep.replace('-', '');
    setLoading(true);
    const response = await getAddressPerCep(validateCpf);

    if (response?.erro) {
      setLoading(false);
      return toast.error('CEP não encontrado');
    }

    if (response) {
      setLoading(false);
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
      return toast.error('Esse bairro não está na nossa área de entrega.');

    setLoading(true);

    const object = {
      address: data.address,
      cep: data.cep !== '' ? data.cep : null,
      number: data.number,
      reference: data.complement,
      district: data.district,
      city: data.city,
      uf: data.uf,
      type_adress: isSelected,
    } as User_Adress;

    const response = await sendAddressUser(object);

    if (response.status === 201) {
      setLoading(false);
      setAddress([...address, response.data]);
      setStep(0);
      addAddress.onClose();
      reset();

      const object = {
        user_Adress_id: response.data.id,
      } as UpdateUserDto;

      await updatedMe(object);

      setUserWithCallback(oldUser => ({
        ...oldUser,
        user_Adress_id: response.data.id,
      }));

      return toast.success('Endereço criado!');
    } else {
      setLoading(false);
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
      addAddress.onClose();
      reset();

      const object = {
        user_Adress_id: response.data.id,
      } as UpdateUserDto;

      await updatedMe(object);

      setUserWithCallback(oldUser => ({
        ...oldUser,
        user_Adress_id: response.data.id,
      }));

      return toast.success('Endereço criado!');
    } else {
      return toast.error('Erro ao cadastrar endereço');
    }
  };

  const handleOnChange = (value: string) => {
    setValue('cep', value);
    setIsValid(value.length === 9);
  };

  const handleClose = () => {
    reset();
    setStep(0);
    addAddress.onClose();
  };

  const body = (
    <div className='flex flex-col w-11/12 mx-auto h-full '>
      <div className='flex flex-col gap-4 h-full '>
        {step === STEPS.CEP && (
          <CepStep
            loading={loading}
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
            loading={loading}
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
            loading={loading}
            errors={errors}
            handleSubmit={handleSubmit}
            register={register}
            saveAddress={saveGeoAddress}
            setIsSelected={setIsSelected}
            result={result}
            setValue={setValue}
          />
        )}
      </div>
    </div>
  );

  return (
    <>
      <Modal
        onClose={handleClose}
        body={body}
        isOpen={addAddress.isOpen}
        title='Adicionar endereço'
      />
    </>
  );
};

export default AddAddressModal;
