import { Api } from '../api/Api';
import { CreateUserDto, LoginUserDto, RecoverPasswordDto } from '../types/Dtos';
import { Category, Discount_cupom, Product } from '../types/ModelsType';

const headers = {
  'Content-Type': 'application/json',
};

export const createUser = async (createUserDto: CreateUserDto) => {
  try {
    const response = await Api.post('/register', createUserDto);
    return response;
  } catch (error: any) {
    return error.response;
  }
};

export const loginUser = async (loginUserDto: LoginUserDto) => {
  try {
    const response = await Api.post('/login', loginUserDto);

    return response;
  } catch (error: any) {
    return error.response;
  }
};

export const recoverPassword = async (
  recoverPasswordDto: RecoverPasswordDto,
) => {
  try {
    const response = await Api.post(
      '/emails/recoverPassword',
      recoverPasswordDto,
    );
    return response;
  } catch (error: any) {
    return error.response;
  }
};

export const getCategories = async (): Promise<Category[]> => {
  try {
    const response = await Api.get('/category');
    return response.data as Category[];
  } catch (error: any) {
    return error;
  }
};

export const getCoupons = async (): Promise<Discount_cupom[]> => {
  try {
    const response = await Api.get('/coupon');
    return response.data as Discount_cupom[];
  } catch (error: any) {
    return error;
  }
};

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await Api.get('/product');
    return response.data as Product[];
  } catch (error: any) {
    return error;
  }
};
