import { ChangeEvent } from 'react';

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  const monthNames = [
    'janeiro',
    'fevereiro',
    'março',
    'abril',
    'maio',
    'junho',
    'julho',
    'agosto',
    'setembro',
    'outubro',
    'novembro',
    'dezembro',
  ];

  return `${day} de ${monthNames[monthIndex]} de ${year}`;
};

export const formatCep = (value: string) => {
  const numericValue = value.replace(/\D/g, '');
  const formattedCep =
    numericValue.length <= 5
      ? numericValue
      : numericValue.slice(0, 5) + '-' + numericValue.slice(5, 8);

  return formattedCep;
};

export const checkIfAddressIsValid = (address: string) => {
  const validDistricts = [
    'Sol nascente',
    'Sulina',
    'Décima',
    'area',
    'Bandeirantes',
  ];

  const lowercaseAddress = address.toLowerCase();

  return validDistricts.some(district =>
    lowercaseAddress.includes(district.toLowerCase()),
  );
};

const formatPhoneNumber = (inputValue: string) => {
  const numericPhoneNumber = inputValue.replace(/\D/g, '');

  let formattedPhoneNumber = '';

  for (let i = 0; i < numericPhoneNumber.length; i++) {
    if (i === 0) {
      formattedPhoneNumber = `(${numericPhoneNumber[i]}`;
    } else if (i === 2) {
      formattedPhoneNumber += `) ${numericPhoneNumber[i]}`;
    } else if (i === 7) {
      formattedPhoneNumber += `-${numericPhoneNumber[i]}`;
    } else {
      formattedPhoneNumber += numericPhoneNumber[i];
    }
  }

  return formattedPhoneNumber;
};

export const formatPhoneNumberUser = (phoneNumber: string) => {
  // Remove todos os caracteres não numéricos
  const numericPhoneNumber = phoneNumber.replace(/\D/g, '');

  // Aplica o regex para formatar como (xx) xxxxx-xxxx
  return numericPhoneNumber.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
};

// Função chamada quando o campo é alterado
export const handleInputChange = (
  event: ChangeEvent<HTMLInputElement>,
  id: string,
) => {
  let inputValue = event.target.value;

  // Aplica o formato se o campo for um número de telefone
  if (id === 'phone') {
    inputValue = formatPhoneNumber(inputValue);
  }

  // Define o valor formatado no campo
  event.target.value = inputValue;

  return inputValue;
};
