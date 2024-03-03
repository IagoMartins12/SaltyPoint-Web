'use client';

import useAuth from '@/app/hooks/auth/useAuth';
import useGlobalStore from '@/app/hooks/store/useGlobalStore';
import usePrivateStore from '@/app/hooks/store/usePrivateStore';
import {
  getAddress,
  getCartProduct,
  getCategories,
  getCoupons,
  getFavorites,
  getGeneralData,
  getMe,
  getOrders,
  getProducts,
  getStates,
  getTypePagaments,
  getUserInfos,
  getUserReward,
} from '@/app/services';
import { useEffect } from 'react';

export const FetchData = () => {
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
      try {
        const [
          categoryData,
          productData,
          typePagamentData,
          statesDate,
          generalData,
        ] = await Promise.all([
          getCategories(),
          getProducts(),
          getTypePagaments(),
          getStates(),
          getGeneralData(),
        ]);

        setCategorys(categoryData);
        setProducts(productData);
        setTypePagament(typePagamentData);
        setStates(statesDate);
        setGeneralData(generalData);
      } catch (error) {
        console.log(error);
      }
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
