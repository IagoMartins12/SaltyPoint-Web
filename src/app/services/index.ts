import { Api } from '../api/Api';

const headers = {
  'Content-Type': 'application/json',
};

export const getCategories = async () => {
  console.log('api', Api);
  try {
    return await Api.get('/category');
  } catch (error) {
    return error;
  }
};
