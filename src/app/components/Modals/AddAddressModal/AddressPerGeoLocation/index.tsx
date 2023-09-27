import { AddressInput, InfoAddressInput } from '@/app/components/Input';
import { AddressRadio } from '@/app/components/RadioButton';
import { AddAddressInfoStepProps } from '@/app/types/ComponentTypes';
import { BsHouseFill } from 'react-icons/bs';
import { FaSuitcase } from 'react-icons/fa';

export const AddressPerGeoLocation: React.FC<AddAddressInfoStepProps> = ({
  errors,
  register,
  saveAddress,
  handleSubmit,
  setIsSelected,
  formatCep,
  handleOnChange,
}) => {
  const optionsDistrict = [
    { name: 'Residencial Sol Nascente' },
    { name: 'Vila sulina' },
    { name: 'Décima área' },
  ];
  return (
    <form className='flex flex-col gap-3' onSubmit={handleSubmit(saveAddress)}>
      <div className='flex flex-col gap-3'>
        <div className='flex flex-col gap-1'>
          <span className='font-light text-sm'>CEP</span>
          <input
            type='text'
            id='cep'
            className={`px-2 py-2 border-b-2 ${
              errors.cep ? 'border-red-500' : ''
            }`}
            {...register('cep', {
              required: true,
            })}
            onChange={ev => {
              if (formatCep && handleOnChange) {
                const formattedCep = formatCep(ev.target.value);
                handleOnChange(formattedCep);
              }
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

        <div className='flex flex-col gap-1 focus:outline-none '>
          <label htmlFor='' className='font-light text-base'>
            Bairro
          </label>
          <select
            id='district'
            className='block w-full p-2 text-sm border-b-2 rounded-lg bg-transparent'
            {...register('district', { required: true })}
          >
            {optionsDistrict.map((option, i) => (
              <option value={option.name} key={i}>
                {option.name}
              </option>
            ))}
          </select>
        </div>

        <AddressInput
          errors={errors}
          id='city'
          register={register}
          label='Cidade'
          disabled
          value='São Paulo'
        />

        <AddressInput
          errors={errors}
          id='uf'
          register={register}
          disabled
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
