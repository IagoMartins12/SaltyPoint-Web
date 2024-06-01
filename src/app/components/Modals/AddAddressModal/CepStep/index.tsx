import { CepInput } from '@/app/components/Input';
import Loader from '@/app/components/Loader';
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
  loading,
}) => {
  return (
    <form className='flex flex-col gap-3' onSubmit={handleSubmit(onSubmit)}>
      <CepInput
        errors={errors}
        handleOnChange={handleOnChange}
        register={register}
      />

      <button
        type='submit'
        className={`flex gap-3 items-center justify-center w-full py-2 rounded-lg bg-red-600 text-white ${
          isValid ? '' : 'opacity-60'
        }`}
        disabled={!isValid || loading ? true : false}
      >
        {loading ? (
          <Loader isMin />
        ) : (
          <>
            <AiOutlineSearch size={25} />
            <span className='font-medium text-lg'>Buscar CEP</span>
          </>
        )}
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
