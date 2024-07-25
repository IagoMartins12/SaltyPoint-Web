'use client';

import { useFormHook } from '@/app/hooks/customHooks/useFormHook';
import { useProductModal } from '@/app/hooks/modals/useProduct';
import useGlobalStore from '@/app/hooks/store/useGlobalStore';
import { Product } from '@/app/types/ModelsType';
import { useCallback, useEffect, useState } from 'react';

export const useCustomProductModal = () => {
  const [quantity, setQuantity] = useState(1);
  const [disabled, setDisabled] = useState(true);
  const [value, setValue] = useState<number | string>(0);
  // const [otherProductsValue, setOtherProductsValue] = useState<number | string>(
  //   0,
  // );
  const [selectedSize, setSelectedSize] = useState(0);
  const [selectedFlavor, setSelectedFlavor] = useState('');
  const [selectedProduct2, setSelectedProduct2] = useState<null | string>(null);
  const [selectedProduct3, setSelectedProduct3] = useState<null | string>(null);

  const productModal = useProductModal();
  const { products } = useGlobalStore();
  const { reset } = useFormHook();

  const sizes = ['Pizza', 'Brotinho'];
  const flavors = ['1 Sabor', '2 Sabores'];

  const removeSelected = (
    setSelectedAction: React.Dispatch<React.SetStateAction<string | null>>,
  ) => {
    // setOtherProductsValue(0);
    setSelectedAction(null);
  };

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
  /*
  Chat, preciso que você refatore uma função. Essa função é complexa. e é usada para calcular o valor de um produto. 
  Porem ela possui as seguintes funcionalidade:
  A pizza pode possuir 3 produtos diferentes. currentProduct = produto atual, primeiro sabor. selectedProduct2 = opcional. Se trata do segundo produto selecionado (pizza meio a meio)
  selectedProduct3 = opcional. Se trata do terceiro produto, que é uma borda. Ou seja, a pizza pode ter dois sabores e uma borda, ou pode ser so um sabor e sem borda
  se um segundo produto for selecionado, a função precisa verificar o preço do segundo produto. Se for maior que o do primeiro produto, ele deve somar a diferença dos valores
  se o valor do segundo produto for menor ou igual, o valor predominante vai continuar sendo do primeiro produto. 
  Caso o usuario selecionar o 3 produto (selectedProduct3), ele vai somar o valor do terceiro produto com o valor atual (do primeiro e do segundo produto, levando como base o que eu falei anteriormente)
  Porem, tem mais uma condição, que é o tamanho da pizza. Caso a pizza for tamanho 1 (selectedSize === 1), significa que é um brotinho, ou seja, vai diminuir o preço em 10
  se for selectedSize === 0, é tamanho normal e nao vai mudar o valor. 
  E o usuario pode digitar a quantidade de pizzas desejadas, que vai multiplar o valor pela quantidade
  */
  const brotinhoPrice = 10;

  const checkValue = useCallback(() => {
    if (!productModal.currentProduct || quantity === 0) {
      return setValue((0).toFixed(2));
    }

    let baseValue = productModal.currentProduct.value;
    let additionalValue = 0;

    // Se um segundo sabor for selecionado
    if (selectedProduct2) {
      const secondProduct = products.find(p => p.id === selectedProduct2);
      if (secondProduct) {
        additionalValue = Math.max(0, secondProduct.value - baseValue);
      }
    }

    // Se uma borda for selecionada
    if (selectedProduct3) {
      const thirdProduct = products.find(p => p.id === selectedProduct3);
      if (thirdProduct) {
        additionalValue += thirdProduct.value;
      }
    }

    // Cálculo do valor total
    let newValue = (baseValue + additionalValue) * quantity;

    // Ajuste de preço para tamanho brotinho
    if (selectedSize === 1) {
      newValue -= brotinhoPrice * quantity;
    }

    setValue(newValue.toFixed(2));
  }, [
    productModal.currentProduct,
    quantity,
    selectedProduct2,
    selectedProduct3,
    selectedSize,
    brotinhoPrice,
    products,
  ]);

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
  }, [checkValue]);

  useEffect(() => {
    if (selectedProduct2 && productModal.currentProduct) {
      const product = products.find(p => p.id === selectedProduct2);
      if (product) {
        const maxValue = Math.max(
          productModal.currentProduct?.value,
          product.value,
        );
        // setOtherProductsValue(maxValue);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProduct2, productModal.currentProduct]);

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
