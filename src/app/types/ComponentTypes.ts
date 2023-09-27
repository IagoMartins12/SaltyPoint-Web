import { IconType } from 'react-icons';
import { Category, Discount_cupom, Product, User_Adress } from './ModelsType';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { GoogleMapsApiResponse } from './GeolocationType';

export interface AuthButton {
  icon?: IconType;
  text: string;
  bgColor: string;
  onClick: () => void;
}

export interface AddressRadioButton {
  icon: IconType;
  text: string;
  index: number; // Adicione o índice como propriedade
  name: string; // Adicione o nome como propriedade
  onChange: (index: number, name: string) => void; // Função de retorno para lidar com mudanças
}
export interface ProductCardType {
  product: Product;
}

export interface StyledInputProps {
  id: string;
  type?: string;
  placeholder?: string;
  register: UseFormRegister<FieldValues>;
  label?: string;
  required: boolean;
}

export interface AdressInputProps {
  id: string;
  type?: string;
  placeholder?: string;
  register: UseFormRegister<FieldValues>;
  label?: string;
  disabled?: boolean;
  errors: FieldErrors<FieldValues>;
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
}

export interface GeoLocationStore {
  GeoAddress: GoogleMapsApiResponse | null;
  setGeoAddress: (address: GoogleMapsApiResponse) => void;
}

export interface deleteProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  currentItem: string | null;
  setCurrentItem: (item: string) => void;
}
export interface ImageComponentType {
  src: string;
  alt: string;
}
