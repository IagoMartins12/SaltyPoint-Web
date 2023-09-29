import {
  SelectAddressProps,
  SelectDistrictProps,
} from '@/app/types/ComponentTypes';

export const SelectDistrict: React.FC<SelectDistrictProps> = ({ register }) => {
  const optionsDistrict = [
    { name: 'Residencial Sol Nascente' },
    { name: 'Vila sulina' },
    { name: 'Décima área' },
  ];

  return (
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
          <option value={option.name} key={i} className='text-sm my-2'>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export const SelectAddress: React.FC<SelectAddressProps> = ({
  register,
  address,
  id,
  userAddressId,
}) => {
  const hasUserAddress = userAddressId !== null;

  return (
    <div className='flex flex-col gap-1 focus:outline-none'>
      <span className='font-light text-base'>Endereço vinculado</span>
      <select
        id={id}
        className='block w-full p-2 text-sm border-b-2 rounded-lg bg-transparent'
        {...register(id, { required: true })}
      >
        {hasUserAddress ? (
          address.map((option, i) => (
            <option
              value={option.id} // Use uma propriedade identificadora adequada aqui
              key={i}
              className='text-sm my-2'
              defaultChecked={option.id === userAddressId}
            >
              {option.address}, {option.number} / {option.district}
            </option>
          ))
        ) : (
          <>
            <option value='' className='text-sm my-2'>
              Nenhum endereço vinculado
            </option>
            {address.map((option, i) => (
              <option
                value={option.id} // Use uma propriedade identificadora adequada aqui
                key={i}
                className='text-sm my-2'
                defaultChecked={option.id === userAddressId}
              >
                {option.address}, {option.number} / {option.district}
              </option>
            ))}
          </>
        )}
      </select>
    </div>
  );
};
