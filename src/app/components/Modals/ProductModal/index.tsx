import Modal from '../../Modal';
import { useProductModal } from '@/app/hooks/modals/useProduct';
import { ProductBody } from './ProductBody';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { CartProductDto } from '@/app/types/Dtos';
import { addCartProduct } from '@/app/services';
import usePrivateStore from '@/app/hooks/store/usePrivateStore';
import toast from 'react-hot-toast';
import { PizzaBody } from './PizzaBody';
import { useCustomProductModal } from './useProductModal';

export const ProductModal = () => {
  const productModal = useProductModal();
  const { cart_product, setCart_product } = usePrivateStore();
  const { handleClose, quantity } = useCustomProductModal();

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

  const productIsPizza = productModal.currentProduct?.name.includes('Pizza');

  const body = productIsPizza ? (
    <PizzaBody onSubmit={onSubmit} />
  ) : (
    <ProductBody onSubmit={onSubmit} />
  );

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
