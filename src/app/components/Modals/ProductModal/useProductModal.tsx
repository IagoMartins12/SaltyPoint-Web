'use client';

import { useFormHook } from '@/app/hooks/customHooks/useFormHook';
import { useProductModal } from '@/app/hooks/modals/useProduct';
import useGlobalStore from '@/app/hooks/store/useGlobalStore';
import { Product } from '@/app/types/ModelsType';
import { useEffect, useState } from 'react';

export const useCustomProductModal = () => {
  const [quantity, setQuantity] = useState(0);
  const [disabled, setDisabled] = useState(true);
  const [value, setValue] = useState<number | string>(0);
  const [otherProductsValue, setOtherProductsValue] = useState<number | string>(
    0,
  );
  const [selectedSize, setSelectedSize] = useState(0);
  const [selectedFlavor, setSelectedFlavor] = useState('');
  const [selectedProduct2, setSelectedProduct2] = useState<null | string>(null);
  const [selectedProduct3, setSelectedProduct3] = useState<null | string>(null);

  const sizes = ['Pizza', 'Brotinho'];

  const flavors = ['1 Sabor', '2 Sabores'];
  const brotinhoPrice = 10 * quantity;

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

    //Se uma borda for selecionado
    if (selectedProduct3 && productModal.currentProduct) {
      const product = products.find(p => p.id === selectedProduct3);

      if (!product) return;
      if (quantity === 0) return setValue((0).toFixed(2));

      //Se um segundo sabor for selecionado
      if (
        otherProductsValue !== 0 &&
        +otherProductsValue > +productModal.currentProduct.value
      ) {
        if (selectedSize === 1) {
          const newValue =
            +otherProductsValue * quantity + product.value * quantity;
          return setValue((newValue - brotinhoPrice).toFixed(2));
        }
        return setValue(
          (+otherProductsValue * quantity + product.value * quantity).toFixed(
            2,
          ),
        );
      } else {
        if (selectedSize === 1) {
          return setValue(
            (
              productModal.currentProduct.value * quantity +
              product.value * quantity -
              brotinhoPrice
            ).toFixed(2),
          );
        }

        return setValue(
          (
            productModal.currentProduct.value * quantity +
            product.value * quantity
          ).toFixed(2),
        );
      }
    }

    //Se um segundo sabor for selecionado
    if (
      otherProductsValue !== 0 &&
      +otherProductsValue > productModal.currentProduct.value
    ) {
      if (selectedSize === 1) {
        return setValue(
          (+otherProductsValue * quantity - brotinhoPrice).toFixed(2),
        );
      }

      console.log('caiu aqui');
      return setValue((+otherProductsValue * quantity).toFixed(2));
    }

    //Se nenhum outro produto foi selecionado
    if (!selectedProduct3 && !selectedProduct2 && productModal.currentProduct) {
      if (selectedSize === 1) {
        const newValue =
          productModal.currentProduct.value * quantity - brotinhoPrice;
        return setValue(newValue.toFixed(2));
      }

      console.log('caiu aqui 2');
      const newValue = productModal.currentProduct.value * quantity;
      return setValue(newValue.toFixed(2));
    }
  };

  const checkDiference = (product: Product) => {
    if (!productModal.currentProduct) return;
    const value = product.value - productModal.currentProduct.value;

    return value.toFixed(2);
  };

  const handleSetProduct2 = (product_id: string) => {
    setSelectedProduct2(product_id);
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
  }, [value, quantity, increaseQuantity, decreaseQuantity]);

  useEffect(() => {
    if (selectedProduct2 && productModal.currentProduct) {
      const product = products.find(p => p.id === selectedProduct2);
      if (product) {
        const maxValue = Math.max(
          productModal.currentProduct?.value,
          product.value,
        );
        setOtherProductsValue(maxValue);
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
    selectedSize,
    setSelectedSize,
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
