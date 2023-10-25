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

export type UpdateUserDto = {
  image?: string;
  name?: string;
  phone?: string;
  user_Adress_id?: string;
};

export type UpdatePasswordDto = {
  newPassword: string;
};

export type FavoritesDto = {
  product_id: string;
};

export type DeleteFavoritesDto = {
  id: string;
};

export type CartProductDto = {
  product_id: string;
  product_id_2?: string;
  product_id_3?: string;
  size: number;
  quantity: number;
  observation?: string;
  value: string;
};

export type RemoveCartProductDto = {
  cart_product_id: string;
};

export type CreateOrderDto = {
  total_amount: number;
  type_delivery: number;
  type_pagament_id: string;
  discount_coupon_id?: string;
  reward_id?: string;
  address_id?: string | null;
  state_id: string;
  discount_value?: number | null;
  contact_phone: string;
};

export type CreateRewardDto = {
  orderId?: string;
  rewardId: string;
};
