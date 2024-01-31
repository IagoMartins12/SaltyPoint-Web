import {
  AddressInputProps,
  CepInputProps,
  InfoAddressInputProps,
  StyledInputProps,
  TextAreaInputProps,
} from '@/app/types/ComponentTypes';
import { formatCep, handleInputChange } from '@/app/utils';
import { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

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
        autoComplete='off'
      />
      <label className='form__label'>{label}</label>
    </div>
  );
};

export const StyledInputPassword: React.FC<StyledInputProps> = ({
  id,
  label,
  register,
  placeholder,
  required,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className='form__group field'>
      <input
        type={isVisible ? 'text' : 'password'}
        className='form__field bg-transparent'
        placeholder={placeholder}
        {...register(id, { required })}
        autoComplete='off'
      />
      <label className='form__label'>{label}</label>

      {isVisible ? (
        <AiOutlineEyeInvisible
          size={25}
          className='absolute right-1 top-8 cursor-pointer'
          onClick={() => {
            setIsVisible(!isVisible);
          }}
        />
      ) : (
        <AiOutlineEye
          size={25}
          className='absolute right-1 top-8 cursor-pointer'
          onClick={() => {
            setIsVisible(!isVisible);
          }}
        />
      )}
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
          autoComplete='off'
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
          autoComplete='off'
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
        autoComplete='off'
      />
    </div>
  );
};

export const CepInput: React.FC<CepInputProps> = ({
  errors,
  register,
  handleOnChange,
  required = true,
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
          required: required,
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

export const PhoneInput: React.FC<AddressInputProps> = ({
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
      <input
        type={type}
        id={id}
        className={`px-2 py-2 border-b-2 ${errors[id] ? 'border-red-500' : ''}`}
        placeholder={placeholder}
        {...register(id, { required })}
        value={value}
        minLength={15}
        maxLength={15} // Define o máximo de caracteres permitidos
        readOnly={disabled}
        onChange={ev => {
          handleInputChange(ev, id);
        }} // Aplica o formato no evento onChange
        autoComplete='off'
      />
    </div>
  );
};

export const PasswordInput: React.FC<InfoAddressInputProps> = ({
  id,
  label,
  register,
  placeholder,
  required,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div className='flex flex-col gap-1 focus:outline-none w-full '>
      <span className='font-light text-base'>{label}</span>
      <div className='w-full flex relative'>
        <input
          type={isVisible ? 'text' : 'password'}
          id={id}
          className={`px-2 py-2 border-b-2 w-full `}
          placeholder={placeholder}
          {...register(id, { required })}
        />
        {isVisible ? (
          <AiOutlineEyeInvisible
            size={25}
            className='absolute right-1 top-2 cursor-pointer'
            onClick={() => {
              setIsVisible(!isVisible);
            }}
          />
        ) : (
          <AiOutlineEye
            size={25}
            className='absolute right-1 top-2 cursor-pointer'
            onClick={() => {
              setIsVisible(!isVisible);
            }}
          />
        )}
      </div>
    </div>
  );
};

export const TextArea: React.FC<TextAreaInputProps> = ({ register }) => {
  return (
    <div className='form__group field'>
      <input
        type={'text'}
        className='form__field bg-transparent h-14'
        {...register('observation')}
      />
      <label className='form__label'>Observação</label>
    </div>
  );
};
