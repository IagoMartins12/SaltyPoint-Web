import { IconType } from 'react-icons';
import {
  Cart,
  Cart_product,
  Category,
  Discount_cupom,
  Favorite,
  General_data,
  Order,
  Product,
  Reward,
  State,
  Type_Pagament,
  User,
  User_Adress,
  User_Rewards,
} from './ModelsType';
import {
  FieldErrors,
  FieldValues,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';
import { GoogleMapsApiResponse, Result } from './GeolocationType';
import { Dispatch, SetStateAction } from 'react';
import { STEPS } from '../components/Modals/AddAddressModal';

export interface AuthButton {
  icon?: IconType;
  text: string | JSX.Element;
  bgColor: string;
  onClick: () => void;
  submit?: boolean;
}

export interface AddressRadioButton {
  icon: IconType;
  text: string;
  index: number;
  name: string;
  onChange: (index: number, name: string) => void;
}

interface BaseInputProps {
  id: string;
  type?: string;
  placeholder?: string;
  register: UseFormRegister<FieldValues>;
  label?: string;
}

interface RequiredInputProps extends BaseInputProps {
  required: boolean;
}
export interface StyledInputProps extends RequiredInputProps {}

export interface AddressInputProps extends BaseInputProps {
  disabled?: boolean;
  errors: FieldErrors<FieldValues>;
  value?: string;
  required?: boolean;
}

export interface InfoAddressInputProps extends RequiredInputProps {
  errors: FieldErrors<FieldValues>;
}

export interface TextAreaInputProps {
  register: UseFormRegister<FieldValues>;
}

export interface CepInputProps {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  handleOnChange: (value: string) => void;
  required?: boolean;
}

export interface AddAddressInfoStepProps {
  loading: boolean;
  register: UseFormRegister<FieldValues>;
  saveAddress: SubmitHandler<FieldValues>;
  errors: FieldErrors<FieldValues>;
  handleSubmit: UseFormHandleSubmit<FieldValues, undefined>;
  setIsSelected: React.Dispatch<React.SetStateAction<number | null>>;
}

export interface AddAddressGeoStepProps extends AddAddressInfoStepProps {
  result?: Result | null;
  setValue: UseFormSetValue<FieldValues>;
}

export interface CepStepProps {
  loading: boolean;
  register: UseFormRegister<FieldValues>;
  onSubmit: SubmitHandler<FieldValues>;
  errors: FieldErrors<FieldValues>;
  handleSubmit: UseFormHandleSubmit<FieldValues, undefined>;
  handleOnChange: (value: string) => void;
  setStep: React.Dispatch<React.SetStateAction<STEPS>>;
  isValid: boolean;
}

export interface GeoLocationProps {
  setStep: React.Dispatch<React.SetStateAction<STEPS>>;
  setResult: React.Dispatch<React.SetStateAction<Result | null>>;
}

export interface CategoryBoxProps {
  label: string;
  selected?: string | null;
  onClick: (category_name: string) => void;
}

export interface ModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export interface DeleteStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  currentItem: string | null;
  setCurrentItem: (item: string) => void;
}

export interface WarningStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  currentItem: Reward | null;
  setCurrentItem: (item: Reward | null) => void;
}

export interface ProductStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  currentProduct: Product | null;
  setCurrentProduct: (product: Product) => void;
}
export interface AuthStore {
  isLogged: boolean;
  setIsLogged: () => void;
  setLogout: () => void;
  token: string | null;
  setToken: (token: string | null) => void;
}

export interface SearchCategoryBox {
  category: Category;
  selected?: string | null;
  onClick: (Category_id: string) => void;
}

export interface CouponCardType {
  coupon: Discount_cupom;
}

export interface SelectedCouponCardType {
  item: Discount_cupom | User_Rewards;
}

export interface SearchProductBox {
  product: Product;
}

export interface Store {
  categorys: Category[] | [];
  setCategorys: (category: Category[]) => void;
  products: Product[] | [];
  setProducts: (products: Product[]) => void;
  typePagament: Type_Pagament[] | [];
  setTypePagament: (typePagament: Type_Pagament[]) => void;
  states: State[];
  setStates: (states: State[]) => void;
  generalData: null | General_data;
  setGeneralData: (generalData: General_data) => void;
}

export interface PrivateStore {
  address: User_Adress[] | [];
  setAddress: (address: User_Adress[]) => void;
  user: User | null;
  setUser: (user: User) => void;
  favorites: Favorite[] | [];
  setFavorites: (favorite: Favorite[]) => void;
  cart: Cart | null;
  setCart: (cart: Cart) => void;
  cart_product: Cart_product[] | [];
  setCart_product: (cart_product: Cart_product[]) => void;
  coupons: Discount_cupom[] | [];
  setCoupons: (discount_cupom: Discount_cupom[]) => void;
  orders: OrderType[] | [];
  setOrders: (orders: OrderType[]) => void;
  userReward: User_Rewards[] | [];
  setUserReward: (reward_order: User_Rewards[]) => void;
}

export interface GeoLocationStore {
  GeoAddress: GoogleMapsApiResponse | null;
  setGeoAddress: (address: GoogleMapsApiResponse) => void;
}

export interface ImageComponentType {
  src: string;
  alt: string;
}

export interface SelectDistrictProps {
  register: UseFormRegister<FieldValues>;
}

export interface SelectAddressProps {
  register: UseFormRegister<FieldValues>;
  address: User_Adress[];
  userAddressId: string | null | undefined;
  id: string;
}

export interface FavoriteButtonProps {
  product: Product;
  filled: boolean;
}

export interface ProductCardType {
  product: Product;
  fullWidth?: boolean;
}

export interface PizzaCardType extends ProductCardType {
  value: string | number;
  selectedProduct2: string | null;
  setSelectedProduct2: React.Dispatch<React.SetStateAction<string | null>>;
  removeSelected: () => void;
  setValue: Dispatch<SetStateAction<string | number>>;
}

export interface NewPizzaProps {
  product: Product;
}

export interface PizzaProductModalType {
  product: Product;
  selectedProduct2: string | null;
  setSelectedProduct2: React.Dispatch<React.SetStateAction<string | null>>;
  removeSelected: (
    setSelectedAction: React.Dispatch<React.SetStateAction<string | null>>,
  ) => void;
  checkDiference: (product: Product) => string | undefined;
}

export interface CornicioneProductModalType {
  product: Product;
  selectedProduct3: string | null;
  setSelectedProduct3: React.Dispatch<React.SetStateAction<string | null>>;
}

export interface PizzaModalProps {
  setValue: Dispatch<SetStateAction<string | number>>;
}

export interface CartProductCardType {
  cart_product: Cart_product;
}

export interface OrderProductCardType extends CartProductCardType {
  quantity: number;
}

export interface OrderType extends Order {
  orderItems: Cart_product[];
}

export type OrderComponentType = {
  order: OrderType;
};

export interface LabelInfo {
  label: string;
  content: string;
}

export interface RewardComponentProps {
  reward: Reward;
  onClick?: (reward: Reward) => void;
}

export interface RewardUserComponentProps {
  reward: User_Rewards;
  onClick?: (reward: User_Rewards) => void;
}

export interface ModalProps {
  isOpen?: any;
  onClose: any;
  title?: string;
  body?: React.ReactElement;
  authModal?: boolean;
}

export interface AnimationCommponentProps {
  setHasPlayed: React.Dispatch<React.SetStateAction<boolean>>;
  repeat?: boolean;
  text?: string;
}

export interface OrderAnimationCommponentProps
  extends AnimationCommponentProps {}
