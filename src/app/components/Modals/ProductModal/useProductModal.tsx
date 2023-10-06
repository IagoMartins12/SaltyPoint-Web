'use client';

import { useFormHook } from '@/app/hooks/customHooks/useFormHook';
import { useProductModal } from '@/app/hooks/modals/useProduct';
import useGlobalStore from '@/app/hooks/store/useGlobalStore';
import { Product } from '@/app/types/ModelsType';
import { useEffect, useState } from 'react';

type ProductType = {
  product_id: string | null;
};

export const useCustomProductModal = () => {
  const [quantity, setQuantity] = useState(0);
  const [disabled, setDisabled] = useState(true);
  const [value, setValue] = useState<number | string>(0);
  const [otherProductsValue, setOtherProductsValue] = useState<number | string>(
    0,
  );
  const [selectedFlavor, setSelectedFlavor] = useState('');
  const [selectedProduct2, setSelectedProduct2] = useState<null | string>(null);
  const [selectedProduct3, setSelectedProduct3] = useState<null | string>(null);

  const sizes = ['Pizza', 'Brotinho'];

  const flavors = ['1 Sabor', '2 Sabores'];

  const removeSelected = (
    setSelectedAction: React.Dispatch<React.SetStateAction<string | null>>,
  ) => {
    setSelectedAction(null);
  };

  const productModal = useProductModal();
  const { products } = useGlobalStore();

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

    if (otherProductsValue !== 0) {
      return setValue((+otherProductsValue * quantity).toFixed(2));
    }
    const newValue = productModal.currentProduct.value * quantity;
    setValue(newValue.toFixed(2));
  };

  const checkDiference = (product: Product) => {
    if (!productModal.currentProduct) return;
    const value = product.value - productModal.currentProduct.value;

    return value.toFixed(2);
  };

  const handleSetProduct2 = (product_id: string) => {
    setSelectedProduct2(product_id);
    console.log('selected product', selectedProduct2);
  };

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

  useEffect(() => {
    if (selectedProduct2 && productModal.currentProduct) {
      const product = products.find(p => p.id === selectedProduct2);
      if (product) {
        const maxValue = Math.max(
          productModal.currentProduct?.value,
          product.value,
        );
        setOtherProductsValue(maxValue);
        console.log('max value', maxValue);
        console.log('other', otherProductsValue);
      }
    }
  }, [selectedProduct2]);

  return {
    quantity,
    disabled,
    value,
    selectedFlavor,
    sizes,
    flavors,
    selectedProduct2,
    selectedProduct3,
    setSelectedFlavor,
    setSelectedProduct2,
    setSelectedProduct3,
    setQuantity,
    setDisabled,
    setValue,
    increaseQuantity,
    decreaseQuantity,
    handleClose,
    removeSelected,
    checkValue,
    checkDiference,
    handleSetProduct2,
  };
};
