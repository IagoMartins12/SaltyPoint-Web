import { StyledInputProps } from '@/app/types/ComponentTypes';

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
