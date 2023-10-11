import { Api } from '../api/Api';
import {
  CEPInfoDto,
  CartProductDto,
  CreateOrderDto,
  CreateUserDto,
  DeleteFavoritesDto,
  FavoritesDto,
  LoginUserDto,
  RecoverPasswordDto,
  RemoveCartProductDto,
  UpdatePasswordDto,
  UpdateUserDto,
} from '../types/Dtos';
import {
  Cart,
  Cart_product,
  Category,
  Discount_cupom,
  Favorite,
  Order,
  Product,
  Type_Pagament,
  User,
  User_Adress,
} from '../types/ModelsType';

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

export const sendAddressUser = async (addressUserDto: User_Adress) => {
  try {
    const response = await Api.post('/address/create', addressUserDto);
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

export const getTypePagaments = async (): Promise<Type_Pagament[]> => {
  try {
    const response = await Api.get('/typePagament');
    return response.data as Type_Pagament[];
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

export const getOrders = async (): Promise<Order[]> => {
  try {
    const response = await Api.get('/order');
    return response.data as Order[];
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

export const getAddress = async (): Promise<User_Adress[]> => {
  try {
    const response = await Api.get('/address/me');
    return response.data as User_Adress[];
  } catch (error: any) {
    return error;
  }
};

export const getAddressPerCep = async (cep: string): Promise<CEPInfoDto> => {
  try {
    const response = await Api.get(`https://viacep.com.br/ws/${cep}/json/`);

    return response.data;
  } catch (error: any) {
    return error.response;
  }
};

export const deleteAddress = async (addressId: string) => {
  try {
    const response = await Api.delete(`/address/${addressId}`);
    return response;
  } catch (error: any) {
    return error;
  }
};

export const getAddressPerGeoLocation = async (
  lat: any,
  lng: any,
  apiKey: string,
) => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`,
    );
    return response;
  } catch (error: any) {
    return error;
  }
};

export const getMe = async (): Promise<User> => {
  try {
    const response = await Api.get('/me');
    return response.data;
  } catch (error: any) {
    return error;
  }
};

export const getFavorites = async (): Promise<Favorite[]> => {
  try {
    const response = await Api.get('/favorites');
    return response.data;
  } catch (error: any) {
    return error;
  }
};

export const addFavorites = async (
  favoriteDto: FavoritesDto,
): Promise<Favorite> => {
  try {
    const response = await Api.post('/favorites/add', favoriteDto);
    return response.data as Favorite;
  } catch (error: any) {
    return error;
  }
};

export const deleteFavorite = async (deleteFavoriteDto: DeleteFavoritesDto) => {
  try {
    const response = await Api.delete('/favorites/delete', {
      data: deleteFavoriteDto,
    });
    return response;
  } catch (error: any) {
    return error;
  }
};

export const updatedMe = async (
  updateUserDto: UpdateUserDto,
): Promise<UpdateUserDto> => {
  try {
    const response = await Api.patch('/me/update', updateUserDto);
    return response.data;
  } catch (error: any) {
    return error.response;
  }
};

export const updatedPassword = async (updatePasswordDto: UpdatePasswordDto) => {
  try {
    const response = await Api.patch('/resetPassword', updatePasswordDto);
    return response;
  } catch (error: any) {
    return error.response;
  }
};

export const deleteMe = async () => {
  try {
    const response = await Api.delete('me/delete');
    return response;
  } catch (error: any) {
    return error.response;
  }
};

export const getCartProduct = async (): Promise<Cart_product[]> => {
  try {
    const response = await Api.get('/cart/products');
    return response.data;
  } catch (error: any) {
    return error;
  }
};

export const addCartProduct = async (
  cartProductDto: CartProductDto,
): Promise<Cart_product> => {
  try {
    const response = await Api.post('/cart/add', cartProductDto);
    return response.data;
  } catch (error: any) {
    return error;
  }
};

export const removeCartProduct = async (
  removeProductCartDto: RemoveCartProductDto,
) => {
  try {
    const response = await Api.delete('/cart/delete', {
      data: removeProductCartDto,
    });
    return response;
  } catch (error: any) {
    return error;
  }
};

export const createOrder = async (
  createOrderDto: CreateOrderDto,
): Promise<Order> => {
  try {
    const response = await Api.post('/order/create', createOrderDto);
    return response.data as Order;
  } catch (error: any) {
    return error;
  }
};
