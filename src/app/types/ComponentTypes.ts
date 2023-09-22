import { IconType } from 'react-icons';
import { Category, Discount_cupom, Product } from './ModelsType';
import { FieldValues, UseFormRegister } from 'react-hook-form';

export interface AuthButton {
  icon?: IconType;
  text: string;
  bgColor: string;
  onClick: () => void;
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

export interface ImageComponentType {
  src: string;
  alt: string;
}
