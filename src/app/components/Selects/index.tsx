import { SelectDistrictProps } from '@/app/types/ComponentTypes';

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
          <option value={option.name} key={i}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};
