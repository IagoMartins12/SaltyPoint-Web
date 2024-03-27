'use client';

import useAuth from '@/app/hooks/auth/useAuth';
import useGlobalStore from '@/app/hooks/store/useGlobalStore';
import usePrivateStore from '@/app/hooks/store/usePrivateStore';
import { getUserInfos } from '@/app/services';
import {
  Category,
  General_data,
  Product,
  State,
  Type_Pagament,
} from '@/app/types/ModelsType';
import { useEffect } from 'react';

interface FetchProps {
  products: Product[];
  category: Category[];
  states: State[];
  generalData: General_data;
  typePagament: Type_Pagament[];
}
export const FetchData: React.FC<FetchProps> = ({
  category,
  generalData,
  products,
  states,
  typePagament,
}) => {
  const {
    setCategorys,
    setProducts,
    setTypePagament,
    setStates,
    setGeneralData,
  } = useGlobalStore();
  const {
    setAddress,
    setUser,
    setFavorites,
    setCart_product,
    setCoupons,
    setOrders,
    setUserReward,
  } = usePrivateStore();
  const { isLogged } = useAuth();

  const fetchData = async () => {
    setCategorys(category);
    setProducts(products);
    setTypePagament(typePagament);
    setStates(states);
    setGeneralData(generalData);
  };

  const fetchAuthData = async () => {
    try {
      const getData = await getUserInfos();

      setCoupons(getData.coupons);
      setAddress(getData.userAddress);
      setUser(getData.user);
      setFavorites(getData.favorites);
      setCart_product(getData.cartProducts);
      setOrders(getData.orders);
      setUserReward(getData.rewards);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (isLogged) {
      fetchData();
    }
  }, [isLogged]);

  return <></>;
};
