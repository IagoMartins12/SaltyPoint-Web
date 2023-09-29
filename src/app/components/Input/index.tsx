import {
  AddressInputProps,
  CepInputProps,
  InfoAddressInputProps,
  StyledInputProps,
} from '@/app/types/ComponentTypes';
import { formatCep } from '@/app/utils';

export const StyledInput: React.FC<StyledInputProps> = ({
  id,
  label,
  type = 'text',
  register,
  placeholder,
  required,
}) => {
  return (
    <div className='form__group field'>
      <input
        type={type}
        className='form__field bg-transparent'
        placeholder={placeholder}
        {...register(id, { required })}
      />
      <label className='form__label'>{label}</label>
    </div>
  );
};

export const AddressInput: React.FC<AddressInputProps> = ({
  id,
  label,
  type = 'text',
  register,
  placeholder,
  errors,
  disabled,
  value,
  required,
}) => {
  return (
    <div
      className={`flex flex-col gap-1 focus:outline-none  ${
        disabled ? 'pointer-events-none opacity-70' : ''
      }`}
    >
      <span className='font-light text-base'>{label}</span>
      {typeof value === 'string' ? (
        <input
          type={type}
          id={id}
          className={`px-2 py-2 border-b-2 ${
            errors[id] ? 'border-red-500' : ''
          }`}
          placeholder={placeholder}
          {...register(id, { required })}
          value={value}
          readOnly={disabled}
        />
      ) : (
        <input
          type={type}
          id={id}
          className={`px-2 py-2 border-b-2 ${
            errors[id] ? 'border-red-500' : ''
          }`}
          placeholder={placeholder}
          {...register(id)}
          readOnly={disabled}
        />
      )}
    </div>
  );
};

export const InfoAddressInput: React.FC<InfoAddressInputProps> = ({
  id,
  label,
  type = 'text',
  register,
  placeholder,
  required,
  errors,
}) => {
  return (
    <div className='flex flex-col gap-1 focus:outline-none '>
      <span className='font-light text-base'>{label}</span>

      <input
        type={type}
        id={id}
        className={`px-2 py-2 border-b-2 ${errors[id] ? 'border-red-500' : ''}`}
        placeholder={placeholder}
        {...register(id, { required })}
      />
    </div>
  );
};

export const CepInput: React.FC<CepInputProps> = ({
  errors,
  register,
  handleOnChange,
}) => {
  return (
    <div className='flex flex-col gap-1'>
      <span className='font-light text-sm'>CEP</span>
      <input
        type='text'
        id='cep'
        className={`px-2 py-2 border-b-2 ${errors.cep ? 'border-red-500' : ''}`}
        placeholder='Exemplo: 05280-000'
        {...register('cep', {
          required: true,
        })}
        onChange={ev => {
          const formattedCep = formatCep(ev.target.value);
          handleOnChange(formattedCep);
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
  );
};
