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
  console.log('address', address);
  const validDistricts = [
    'Sol nascente',
    'Sulina',
    'Décima',
    'area',
    'Bandeirantes',
  ];

  // Transforma o endereço em letras minúsculas para tornar a busca case-insensitive
  const lowercaseAddress = address.toLowerCase();

  // Verifica se o endereço contém pelo menos uma das palavras-chave
  return validDistricts.some(district =>
    lowercaseAddress.includes(district.toLowerCase()),
  );
};

const formatPhoneNumber = (inputValue: string) => {
  // Remove todos os caracteres não numéricos
  const numericPhoneNumber = inputValue.replace(/\D/g, '');

  // Aplica o formato "(xx) xxxxx-xxxx"
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
