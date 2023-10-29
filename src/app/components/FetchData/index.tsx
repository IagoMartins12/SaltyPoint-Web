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
  getMe,
  getOrders,
  getProducts,
  getStates,
  getTypePagaments,
  getUserReward,
} from '@/app/services';
import { useEffect } from 'react';

export const FetchData = () => {
  const { setCategorys, setProducts, setTypePagament, setStates } =
    useGlobalStore();
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
        const [categoryData, productData, typePagamentData, statesDate] =
          await Promise.all([
            getCategories(),
            getProducts(),
            getTypePagaments(),
            getStates(),
          ]);

        setCategorys(categoryData);
        setProducts(productData);
        setTypePagament(typePagamentData);
        setStates(statesDate);
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
          const [
            addressData,
            userData,
            favoriteData,
            cartProductData,
            couponsData,
            orderData,
            rewardData,
          ] = await Promise.all([
            getAddress(),
            getMe(),
            getFavorites(),
            getCartProduct(),
            getCoupons(),
            getOrders(),
            getUserReward(),
          ]);

          setCoupons(couponsData);
          setAddress(addressData);
          setUser(userData);
          setFavorites(favoriteData);
          setCart_product(cartProductData);
          setOrders(orderData);
          setUserReward(rewardData);
        } catch (error) {
          console.log(error);
        }
      };

      fetchData();
    }
  }, [isLogged]);
  return <></>;
};
