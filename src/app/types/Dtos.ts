export type CreateUserDto = {
  email: string;
  name: string;
  password: string;
};

export type LoginUserDto = {
  email: string;
  password: string;
};

export type RecoverPasswordDto = {
  to: string;
};

export type CEPInfoDto = {
  bairro: string;
  cep: string;
  complemento: string | null;
  ddd: string;
  gia: string;
  ibge: string;
  localidade: string;
  logradouro: string;
  siafi: string;
  uf: string;
  erro?: string;
};

export type AddressUserDto = {
  cep: string;
  address: string;
  number: string;
  city: string;
  uf: string;
  district: string;
  reference: string;
  type_adress: number;
};
