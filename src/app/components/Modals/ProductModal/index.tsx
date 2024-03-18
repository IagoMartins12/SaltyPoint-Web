'use client';

import Modal from '../../Modal';
import { useProductModal } from '@/app/hooks/modals/useProduct';
import { ProductBody } from './ProductBody';

import { PizzaBody } from './PizzaBody';
import { useCustomProductModal } from './useProductModal';
import { Product } from '@/app/types/ModelsType';

const ProductModal = () => {
  const productModal = useProductModal();
  const { handleClose } = useCustomProductModal();

  const productIsPizza = (
    productModal.currentProduct as Product
  )?.name.includes('Pizza');

  const body = productIsPizza ? <PizzaBody /> : <ProductBody />;

  return (
    <>
      <Modal
        onClose={handleClose}
        body={body}
        title='Produto'
        isOpen={productModal.isOpen}
      />
    </>
  );
};

export default ProductModal;
