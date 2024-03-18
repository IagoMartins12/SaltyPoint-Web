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

  useEffect(() => {
    const fetchData = async () => {
      // try {
      // const [
      //   categoryData,
      //   productData,
      //   typePagamentData,
      //   statesDate,
      //   generalData,
      // ] = await Promise.all([
      //   getCategories(),
      //   getProducts(),
      //   getTypePagaments(),
      //   getStates(),
      //   getGeneralData(),
      // ]);

      setCategorys(category);
      setProducts(products);
      setTypePagament(typePagament);
      setStates(states);
      setGeneralData(generalData);
      // } catch (error) {
      //   console.log(error);
      // }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (isLogged) {
      const fetchData = async () => {
        try {
          const getData = await getUserInfos();

          // const [
          //   addressData,
          //   userData,
          //   favoriteData,
          //   cartProductData,
          //   couponsData,
          //   orderData,
          //   rewardData,
          //   testeData,
          // ] = await Promise.all([
          //   getAddress(),
          //   getMe(),
          //   getFavorites(),
          //   getCartProduct(),
          //   getCoupons(),
          //   getOrders(),
          //   getUserReward(),
          //   getUserInfos(),
          // ]);

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

      fetchData();
    }
  }, [isLogged]);

  return <></>;
};
