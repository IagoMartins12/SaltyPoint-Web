import { CepStepProps } from '@/app/types/ComponentTypes';
import { AiOutlineQuestionCircle, AiOutlineSearch } from 'react-icons/ai';

export const CepStep: React.FC<CepStepProps> = ({
  errors,
  handleSubmit,
  register,
  onSubmit,
  handleOnChange,
  isValid,
  setStep,
  formatCep,
}) => {
  return (
    <form className='flex flex-col gap-3' onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-col gap-1'>
        <span className='font-light text-sm'>CEP</span>
        <input
          type='text'
          id='cep'
          className={`px-2 py-2 border-b-2 ${
            errors.cep ? 'border-red-500' : ''
          }`}
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

      <button
        type='submit'
        className={`flex gap-3 items-center justify-center w-full py-2 rounded-lg bg-red-600 text-white ${
          isValid ? '' : 'opacity-60'
        }`}
        disabled={!isValid}
      >
        <AiOutlineSearch size={25} />
        <span className='font-medium text-lg'>Buscar CEP</span>
      </button>

      <button
        className={`flex gap-3 items-center justify-center w-full py-2 rounded-lg`}
        onClick={() => {
          setStep(2);
        }}
      >
        <AiOutlineQuestionCircle size={25} />
        <span className='font-medium text-sm'>Não sei meu cep</span>
      </button>
    </form>
  );
};
