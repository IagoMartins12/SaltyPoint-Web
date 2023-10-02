import { IconType } from 'react-icons';
import {
  Category,
  Discount_cupom,
  Favorite,
  Product,
  User,
  User_Adress,
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
import { STEPS } from '../components/Modals/AddAddressModal';
import { Dispatch, SetStateAction } from 'react';

export interface AuthButton {
  icon?: IconType;
  text: string;
  bgColor: string;
  onClick: () => void;
}

export interface AddressRadioButton {
  icon: IconType;
  text: string;
  index: number;
  name: string;
  onChange: (index: number, name: string) => void;
}
export interface ProductCardType {
  product: Product;
  fullWidth: boolean;
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

export interface CepInputProps {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  handleOnChange: (value: string) => void;
}

export interface AddAddressInfoStepProps {
  register: UseFormRegister<FieldValues>;
  saveAddress: SubmitHandler<FieldValues>;
  errors: FieldErrors<FieldValues>;
  handleSubmit: UseFormHandleSubmit<FieldValues, undefined>;
  setIsSelected: React.Dispatch<React.SetStateAction<number | null>>;
}

export interface AddAddressGeoStepProps extends AddAddressInfoStepProps {
  handleOnChange: (value: string) => void;
  result?: Result | null;
  setValue: UseFormSetValue<FieldValues>;
}

export interface CepStepProps {
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

export interface SearchProductBox {
  product: Product;
}

export interface Store {
  categorys: Category[] | [];
  setCategorys: (category: Category[]) => void;
  products: Product[] | [];
  setProducts: (products: Product[]) => void;
}

export interface PrivateStore {
  address: User_Adress[] | [];
  setAddress: (address: User_Adress[]) => void;
  user: User | null;
  setUser: (user: User) => void;
  favorites: Favorite[] | [];
  setFavorites: (favorite: Favorite[]) => void;
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

export interface ProductModalProps {
  value: string | number;
  quantity: number;
  disabled: boolean;
  decreaseQuantity: () => void;
  increaseQuantity: () => void;
}
