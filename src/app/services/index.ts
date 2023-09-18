import { Api } from '../api/Api';
import { CreateUserDto } from '../types/Dtos';

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
    console.log(response);
    return response; // Retorna a resposta em caso de sucesso
  } catch (error: any) {
    return error.response; // Retorna a resposta de erro em caso de falha
  }
};
