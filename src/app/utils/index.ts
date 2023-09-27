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
