'use client';

import {
  SelectAddressProps,
  SelectDistrictProps,
} from '@/app/types/ComponentTypes';
import { useState } from 'react';

export const SelectDistrict: React.FC<SelectDistrictProps> = ({ register }) => {
  const [focus, setFocus] = useState(false);

  const handleFocus = () => {
    setFocus(true);
  };

  const handleBlur = () => {
    setFocus(false);
  };

  const optionsDistrict = [
    { name: 'Residencial Sol Nascente' },
    { name: 'Vila sulina' },
    { name: 'Décima área' },
  ];

  return (
    <div className='flex flex-col gap-1 focus:outline-none '>
      <label
        htmlFor=''
        className={`font-light text-base ${focus ? 'text-red-500' : ''}`}
      >
        Bairro
      </label>
      <select
        id='district'
        onFocus={handleFocus}
        className={`block w-full p-2 text-sm border-b-2 rounded-lg bg-transparent `}
        {...register('district', { required: true, onBlur: handleBlur })}
      >
        {optionsDistrict.map((option, i) => (
          <option
            value={option.name}
            key={i}
            className='text-sm my-2'
            onBlur={handleBlur}
          >
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
  const [focus, setFocus] = useState(false);

  const handleFocus = () => {
    setFocus(true);
  };

  const handleBlur = () => {
    setFocus(false);
  };

  const hasUserAddress = userAddressId !== null;

  return (
    <div className='flex flex-col gap-1 focus:outline-none'>
      <span
        className={`font-light text-base ${
          focus ? 'text-red-500' : ''
        } transition-all duration-300`}
      >
        Endereço vinculado
      </span>
      <select
        id={id}
        onFocus={handleFocus}
        className='block w-full p-2 text-sm border-b-2 rounded-lg bg-transparent'
        {...register(id, { onBlur: handleBlur })}
      >
        {hasUserAddress ? (
          address.map((option, i) => (
            <option
              value={option.id} // Use uma propriedade identificadora adequada aqui
              key={i}
              className='text-sm my-2'
              selected={option.id === userAddressId}
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
