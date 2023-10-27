export type User = {
  id: string;
  email: string;
  emailVerified?: Date | null;
  name?: string | null;
  password?: string | null;
  image?: string | null;
  phone?: string | null;
  token?: string | null;
  createdAt: Date;
  role: number;
  user_Adress_id?: string | null;
  points: number;

  orders: Order[];
  account: Account[];
  user_adress: User_Adress[];
  discount_cupom_orders: Discount_cupom_orders[];
  cart: Cart[];
  favorites: Favorite[];
};

export type Account = {
  id: string;
  user_id: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token?: string | null;
  access_token?: string | null;
  expires_at?: number | null;
  token_type?: string | null;
  scope?: string | null;
  id_token?: string | null;
  session_state?: string | null;

  user: User;
};

export type User_Adress = {
  id: string;
  user_id: string;
  cep?: string | null;
  address: string;
  number: number;
  city: String;
  uf: String;
  district: String;
  reference?: string | null;
  type_adress: number;
  isActive: number;

  user: User;
  order: Order[];
};

export type Order = {
  id: string;
  user_id: string;
  order_date: Date;
  state_id: string;
  total_amount: number;
  type_pagament_id: string;
  delivery_man_id?: string | null;
  user_adress_id?: string | null;
  discount_coupon_id?: string | null;
  discount_value?: number | null;
  user: User;
  state: State;
  delivery_man?: Delivery_Man | null;
  type_pagament: Type_Pagament;
  user_adress?: User_Adress | null;
  discount_coupon?: Discount_cupom | null;
  contact_phone: string;
  reward_id?: string;

  order_products: Order_Product[];
  discount_cupom_orders: Discount_cupom_orders[];
};

export type State = {
  id: string;
  state_name: string;

  orders: Order[];
};

export type Delivery_Man = {
  id: string;
  delivery_man_name: string;

  orders: Order[];
};

export type Type_Pagament = {
  id: string;
  type_pagament_name: string;

  orders: Order[];
};

export type Order_Product = {
  id: string;
  product_id: string;
  product_id_2?: string | null;
  product_id_3?: string | null;
  size: number;
  value: string;
  order_id: string;
  quantity: number;
  observation?: string | null;

  order: Order;
  product: Product;
  product_2?: Product | null;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  value: number;
  category_id: string;
  product_image: string;
  stock_id?: string | null;

  category: Category;

  order_product: Order_Product[];
  order_product_2: Order_Product[];
  cart_product: Cart_product[];
  cart_product_2: Cart_product[];
  stock: Stock[];
  favorites: Favorite[];
};

export type Stock = {
  id: string;
  product_id: string;
  quantity: number;

  product: Product;
};

export type Category = {
  id: string;
  category_name: string;

  products: Product[];
};

export type Discount_cupom = {
  id: string;
  cupom_name: string;
  discount: number;
  expiration_date: Date;
  active: number;
  type_coupon: number; // 0 = public, 1 =  private
  discount_cupom_orders: Discount_cupom_orders[];
  order: Order[];
};

export type Discount_cupom_orders = {
  id: string;
  discount_cupom_id: string;
  order_id: string;
  user_id: string;
  created_at: Date;

  user: User;
  order: Order;
  discount_cupom: Discount_cupom;
};

export type Cart = {
  id: string;
  user_id: string;
  is_active: number;

  user: User;
  cart_product: Cart_product[];
};

export type Cart_product = {
  id: string;
  product_id: string;
  product_id_2?: string | null;
  product_id_3?: string | null;
  cart_id: string;
  observation?: string | null;
  quantity: number;
  size: number | null;
  value: string;

  cart: Cart;
  product: Product;
  product_2?: Product | null;
};

export type Favorite = {
  id: string;
  user_id: string;
  product_id: string;

  user: User;
  post: Product;
};

export type Reward = {
  id: string;
  quantity_points: number;
  image: string;
  product_id?: string;
  discount?: number;
  type_reward: number; //0 - Disconto / 1 - Produt
  name: string;
};

export type Reward_Orders = {
  id: string;
  reward_id: string;
  order_id: string;
  created_at: Date;
  isUser: number; // 0 = não usado,  1 = usado,
  reward_code: string;
};

export type User_Rewards = {
  id: string;
  rewardId: string;
  rewardImage: string;
  rewardName: string;
  reward_code: string;
  rewardPoints: number;
  rewardType: number;
  rewardDiscount: number;
  rewardProductId: string;
};
