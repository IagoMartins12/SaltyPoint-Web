import { Api } from '../api/Api';
import { CreateUserDto, LoginUserDto } from '../types/Dtos';
import { Category, Product } from '../types/ModelsType';

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
    console.log('loginUserDto', loginUserDto);
    const response = await Api.post('/login', loginUserDto);
    console.log('response', response);

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

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await Api.get('/product');
    return response.data as Product[];
  } catch (error: any) {
    return error;
  }
};
