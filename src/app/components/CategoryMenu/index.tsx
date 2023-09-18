'use client';
import { getCategories } from '@/app/services';
import { useEffect, useState } from 'react';

export const CategoryMenu = () => {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCategories();
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData(); // Chame a função assíncrona aqui
  }, []);
  return (
    <div className='pt-4 flex flex-row items-center justify-between overflow-x-auto'></div>
  );
};
