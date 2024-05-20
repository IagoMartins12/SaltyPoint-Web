import { AddressInput } from '@/app/components/Input';
import Loader from '@/app/components/Loader';
import { AddressRadio } from '@/app/components/RadioButton';
import { AddAddressInfoStepProps } from '@/app/types/ComponentTypes';
import { BsHouseFill } from 'react-icons/bs';
import { FaSuitcase } from 'react-icons/fa';

export const AddressInfoStep: React.FC<AddAddressInfoStepProps> = ({
  loading,
  errors,
  register,
  saveAddress,
  handleSubmit,
  setIsSelected,
}) => {
  return (
    <form
      className='flex flex-col gap-3  pb-3'
      onSubmit={handleSubmit(saveAddress)}
    >
      <div className='flex flex-col gap-3'>
        <AddressInput
          errors={errors}
          id='cep'
          register={register}
          disabled
          label='Cep'
        />

        <AddressInput
          errors={errors}
          id='address'
          register={register}
          label='Endereço'
        />
        <AddressInput
          id='number'
          register={register}
          required
          label='Numero'
          errors={errors}
        />
        <AddressInput
          id='complement'
          register={register}
          label='Complemento'
          required={false}
          errors={errors}
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
          {loading ? (
            <Loader isMin />
          ) : (
            <span className='font-medium text-lg'>Salvar </span>
          )}
        </button>
      </div>
    </form>
  );
};
