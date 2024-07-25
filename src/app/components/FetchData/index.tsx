'use client';

import useAuth from '@/app/hooks/auth/useAuth';
import useGlobalStore from '@/app/hooks/store/useGlobalStore';
import usePrivateStore from '@/app/hooks/store/usePrivateStore';
import {
  getCategories,
  getGeneralData,
  getProducts,
  getStates,
  getTypePagaments,
  getUserInfos,
} from '@/app/services';
import { useEffect } from 'react';

interface FetchProps {}
const FetchData: React.FC<FetchProps> = () => {
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
    const [product, category, typePagament, states, generalData] =
      await Promise.all([
        getProducts(),
        getCategories(),
        getTypePagaments(),
        getStates(),
        getGeneralData(),
      ]);

    setCategorys(category);
    setProducts(product);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isLogged) {
      fetchAuthData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogged]);

  return <></>;
};

export default FetchData;
