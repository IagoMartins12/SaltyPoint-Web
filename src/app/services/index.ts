import { Api } from '../api/Api';
import { OrderType } from '../types/ComponentTypes';
import {
  CEPInfoDto,
  CartProductDto,
  CreateOrderDto,
  CreateRewardDto,
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
  Cart_product,
  Category,
  Discount_cupom,
  Favorite,
  Order,
  Product,
  Reward,
  State,
  Type_Pagament,
  User,
  User_Adress,
  User_Rewards,
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

export const getStates = async (): Promise<State[]> => {
  try {
    const response = await Api.get('/state');
    return response.data as State[];
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

export const getOrders = async (): Promise<OrderType[]> => {
  try {
    const response = await Api.get('/order');
    return response.data as OrderType[];
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
    const response = await Api.put(`/address/${addressId}`);
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

export const getRewards = async (): Promise<Reward[]> => {
  try {
    const response = await Api.get('/reward');
    return response.data;
  } catch (error: any) {
    return error;
  }
};
export const getUserInfos = async () => {
  try {
    const response = await Api.get('/me/info');
    return response.data;
  } catch (error: any) {
    return error;
  }
};

export const getUserReward = async (): Promise<User_Rewards[]> => {
  try {
    const response = await Api.get('/reward/user');
    return response.data;
  } catch (error: any) {
    return error;
  }
};

export const postReward = async (
  rewardDto: CreateRewardDto,
): Promise<User_Rewards> => {
  try {
    const response = await Api.post('/reward', rewardDto);
    return response.data as User_Rewards;
  } catch (error: any) {
    return error;
  }
};

export const googleLogin = async () => {
  try {
    const response = await Api.get('/social');
    return response;
  } catch (error: any) {
    return error;
  }
};

export const getGeneralData = async () => {
  try {
    const response = await Api.get('/general-data');
    return response.data;
  } catch (error: any) {
    return error;
  }
};
