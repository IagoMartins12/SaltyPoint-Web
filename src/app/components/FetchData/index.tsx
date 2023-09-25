'use client';

import useAuth from '@/app/hooks/auth/useAuth';
import useGlobalStore from '@/app/hooks/store/useGlobalStore';
import usePrivateStore from '@/app/hooks/store/usePrivateStore';
import { getAddress, getCategories, getProducts } from '@/app/services';
import { useEffect } from 'react';

export const FetchData = () => {
  const { setCategorys, setProducts } = useGlobalStore();
  const { setAddress } = usePrivateStore();
  const { isLogged } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryData = await getCategories();
        const productData = await getProducts();
        setCategorys(categoryData);
        setProducts(productData);
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
          setAddress(addressData);
        } catch (error) {
          console.log(error);
        }
      };

      fetchData();
    }
  }, [isLogged]);
  return <></>;
};
