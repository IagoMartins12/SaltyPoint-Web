'use client';
import { getCategories, getProducts } from '@/app/services';
import { Category, Product } from '@/app/types/ModelsType';
import { useEffect, useState } from 'react';
import { ProductCard } from '../ProductCard';

export const ProductMenu = () => {
  const [category, setCategory] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryData = await getCategories();
        const productData = await getProducts();
        setCategory(categoryData);
        setProducts(productData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='w-10/12 mx-auto pt-4 flex flex-col gap-8'>
      {category
        .filter(c => c.category_name !== 'Bordas')
        .map(item => (
          <div className='flex flex-col w-full gap-6' key={item.id}>
            <span className='font-medium text-3xl'>{item.category_name}</span>
            <div className='flex gap-4 flex-wrap justify-center'>
              {products
                .filter(p => p.category_id === item.id)
                .map(product => (
                  <ProductCard product={product} key={product.id} />
                ))}
            </div>
          </div>
        ))}
    </div>
  );
};
