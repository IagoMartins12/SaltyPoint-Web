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
  } = usePrivateStore();
  const { isLogged } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryData = await getCategories();
        const productData = await getProducts();
        const typePagamentData = await getTypePagaments();
        const statesDate = await getStates();
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
          const addressData = await getAddress();
          const userData = await getMe();
          const favoriteData = await getFavorites();
          const cartProductData = await getCartProduct();
          const couponsData = await getCoupons();
          const orderData = await getOrders();

          setCoupons(couponsData);
          setAddress(addressData);
          setUser(userData);
          setFavorites(favoriteData);
          setCart_product(cartProductData);
          setOrders(orderData);
        } catch (error) {
          console.log(error);
        }
      };

      fetchData();
    }
  }, [isLogged]);
  return <></>;
};
