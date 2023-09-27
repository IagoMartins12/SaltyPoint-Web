import { AdressInputProps, StyledInputProps } from '@/app/types/ComponentTypes';

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

export const AddressInput: React.FC<AdressInputProps> = ({
  id,
  label,
  type = 'text',
  register,
  placeholder,
  errors,
  disabled,
  value,
}) => {
  return (
    <div
      className={`flex flex-col gap-1 focus:outline-none  ${
        disabled ? 'pointer-events-none opacity-70' : ''
      }`}
    >
      <span className='font-light text-base'>{label}</span>
      {value !== undefined ? (
        <input
          type={type}
          id={id}
          className={`px-2 py-2 border-b-2 ${
            errors[id] ? 'border-red-500' : ''
          }`}
          placeholder={placeholder}
          {...register(id, {
            required: false,
          })}
          value={value}
        />
      ) : (
        <input
          type={type}
          id={id}
          className={`px-2 py-2 border-b-2 ${
            errors[id] ? 'border-red-500' : ''
          }`}
          placeholder={placeholder}
          {...register(id, {
            required: 'Campo obrigatório',
          })}
        />
      )}
      {errors[id] && typeof errors[id]?.message === 'string' && (
        <span className='text-red-500'>{errors[id]?.message?.toString()}</span>
      )}
    </div>
  );
};

export const InfoAddressInput: React.FC<StyledInputProps> = ({
  id,
  label,
  type = 'text',
  register,
  placeholder,
  required,
}) => {
  return (
    <div className='flex flex-col gap-1 focus:outline-none '>
      <span className='font-light text-base'>{label}</span>

      <input
        type={type}
        id={id}
        className='px-2 py-2 border-b-2 focus:border-3'
        placeholder={placeholder}
        {...register(id, { required })}
      />
    </div>
  );
};
