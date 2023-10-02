import { FieldValues, useForm } from 'react-hook-form';

export const useFormHook = () => {
  const { register, handleSubmit, reset } = useForm<FieldValues>();

  return {
    register,
    handleSubmit,
    reset,
  };
};
