import Modal from '../../Modal';
import { useProductModal } from '@/app/hooks/modals/useProduct';
import { useEffect, useState } from 'react';
import { ProductBody } from './ProductBody';

export const ProductModal = () => {
  const [quantity, setQuantity] = useState(0);
  const [disabled, setDisabled] = useState(true);
  const [value, setValue] = useState<number | string>(0);
  const productModal = useProductModal();

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity === 0) return;
    setQuantity(quantity - 1);
  };

  const handleClose = () => {
    setQuantity(0);
    productModal.onClose();
  };

  const checkValue = () => {
    if (!productModal.currentProduct) return;

    const value = productModal.currentProduct.value * quantity;
    setValue(value.toFixed(2));
  };

  const body = (
    <ProductBody
      decreaseQuantity={decreaseQuantity}
      increaseQuantity={increaseQuantity}
      disabled={disabled}
      quantity={quantity}
      value={value}
    />
  );

  useEffect(() => {
    if (quantity !== 0) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [quantity]);

  useEffect(() => {
    checkValue();
  }, [value, quantity]);

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
