import {
  AddressInput,
  CepInput,
  InfoAddressInput,
} from '@/app/components/Input';
import { AddressRadio } from '@/app/components/RadioButton';
import { SelectDistrict } from '@/app/components/Selects';
import { AddAddressGeoStepProps } from '@/app/types/ComponentTypes';
import { useEffect } from 'react';
import { BsHouseFill } from 'react-icons/bs';
import { FaSuitcase } from 'react-icons/fa';

export const onlyDistrict = ['sublocality', 'postal_code'];

export const addressTypes = [
  'street_address',
  'route',
  'postal_code',
  'establishment',
  'point_of_interest',
];

export const AddressPerGeoLocation: React.FC<AddAddressGeoStepProps> = ({
  errors,
  register,
  saveAddress,
  handleSubmit,
  setIsSelected,
  handleOnChange,
  result,
  setValue,
}) => {
  useEffect(() => {
    if (!result) return;

    if (result.types.some(type => addressTypes.includes(type))) {
      setValue('address', result.address_components[1].long_name);
    }

    if (result.types.some(type => onlyDistrict.includes(type))) {
      setValue('district', result.address_components[1].long_name);
    }
  }, [result]);

  return (
    <form
      className='flex flex-col gap-3 pb-3'
      onSubmit={handleSubmit(saveAddress)}
    >
      <div className='flex flex-col gap-3'>
        <CepInput
          errors={errors}
          handleOnChange={handleOnChange}
          register={register}
        />
        <InfoAddressInput
          errors={errors}
          id='address'
          register={register}
          label='Endereço'
          required
        />
        <InfoAddressInput
          id='number'
          register={register}
          required
          label='Numero'
          errors={errors}
        />
        <InfoAddressInput
          id='complement'
          register={register}
          label='Complemento'
          required={false}
          errors={errors}
        />

        <SelectDistrict register={register} />

        <AddressInput
          errors={errors}
          id='cityGeo'
          register={register}
          label='Cidade'
          value='São Paulo'
        />

        <AddressInput
          errors={errors}
          id='ufGeo'
          register={register}
          label='Estado'
          value='SP'
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
  );
};
