import Modal from '../../Modal';
import { useProductModal } from '@/app/hooks/modals/useProduct';
import { useEffect, useState } from 'react';
import { ProductBody } from './ProductBody';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { CartProductDto } from '@/app/types/Dtos';
import { addCartProduct } from '@/app/services';
import usePrivateStore from '@/app/hooks/store/usePrivateStore';
import toast from 'react-hot-toast';
import { useFormHook } from '@/app/hooks/customHooks/useFormHook';
import { PizzaBody } from './PizzaBody';

export const ProductModal = () => {
  const [quantity, setQuantity] = useState(0);
  const [disabled, setDisabled] = useState(true);
  const [value, setValue] = useState<number | string>(0);
  const productModal = useProductModal();

  const { cart_product, setCart_product } = usePrivateStore();
  const { reset } = useFormHook();

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
    reset();
  };

  const checkValue = () => {
    if (!productModal.currentProduct) return;

    const value = productModal.currentProduct.value * quantity;
    setValue(value.toFixed(2));
  };

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    const response = await addCartProduct({
      product_id: productModal.currentProduct?.id,
      observation: data.observation,
      quantity: quantity,
    } as CartProductDto);

    if (response) {
      const updatedCartProduct = [...cart_product, response];
      setCart_product(updatedCartProduct);
      toast.success('Produto adicionado');
      handleClose();
    }
  };

  let body = (
    <ProductBody
      decreaseQuantity={decreaseQuantity}
      increaseQuantity={increaseQuantity}
      disabled={disabled}
      quantity={quantity}
      value={value}
      onSubmit={onSubmit}
    />
  );

  if (productModal.currentProduct?.name.includes('Pizza')) {
    body = (
      <PizzaBody
        decreaseQuantity={decreaseQuantity}
        increaseQuantity={increaseQuantity}
        disabled={disabled}
        quantity={quantity}
        value={value}
        onSubmit={onSubmit}
      />
    );
  }
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
