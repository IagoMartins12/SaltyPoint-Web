import { Api } from '../api/Api';
import { CreateUserDto, LoginUserDto } from '../types/Dtos';

const headers = {
  'Content-Type': 'application/json',
};

export const getCategories = async () => {
  try {
    return await Api.get('/category');
  } catch (error) {
    return error;
  }
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
