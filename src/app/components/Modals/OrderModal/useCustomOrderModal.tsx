import {
  useAddress,
  useOrderModal,
  useUserInfoModal,
} from '@/app/hooks/modals/useModal';
import usePrivateStore from '@/app/hooks/store/usePrivateStore';
import { getTypePagaments } from '@/app/services';
import { Discount_cupom, Type_Pagament } from '@/app/types/ModelsType';
import { handleSetSelected } from '@/app/utils';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { BiStoreAlt } from 'react-icons/bi';
import { MdOutlineDeliveryDining } from 'react-icons/md';

export const useCustomOrderModal = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const [showCoupon, setShowCoupon] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState('');
  const [couponApplied, setCouponApplied] = useState<Discount_cupom | null>(
    null,
  );

  const [typePagament, setTypePagament] = useState<Type_Pagament[] | []>([]);
  const [selectedTypePagament, setSelectedTypePagament] = useState<
    null | string
  >(null);

  const { cart_product, coupons, user, address } = usePrivateStore();

  const districtRate = ['Sulina', 'Décima', 'area', 'Bandeirantes'];
  const orderModal = useOrderModal();
  const addressModal = useAddress();
  const userInfo = useUserInfoModal();
  const cartProductTotal = cart_product.reduce(
    (total, item) => total + Number(item.value),
    0,
  );

  const handleGetMoreProduct = () => {
    orderModal.onClose();
    handleSetSelected('Pizzas Salgadas');
  };

  const handleOpenAddressModal = () => {
    if (address.length === 0) {
      toast.error('É necessario possuir ao minimo um endereço cadastrado');
      orderModal.onClose();
      return addressModal.onOpen();
    }

    if (address.length !== 0 && !user?.user_Adress_id) {
      toast.error('É necessario vincular um endereço a sua conta ');
      orderModal.onClose();
      return userInfo.onOpen();
    }
  };

  const onSubmit = () => {
    if (!user?.phone) {
      toast.error('Por favor, insira um telefone antes de finalizar o pedido');
      orderModal.onClose();
      userInfo.onOpen();
      return;
    }
    const object = {
      total_amount: getTotal(),
      type_pagament_id: selectedTypePagament,
      user_adress_id: selected === 0 ? user?.user_Adress_id : null,
      discount_coupon_id: couponApplied ? couponApplied.id : null,
    };

    console.log('object', object);
  };

  const deliveryOptions = [
    {
      name: 'Delivery',
      icon: <MdOutlineDeliveryDining size={30} />,
    },
    {
      name: 'Retirar na loja',
      icon: <BiStoreAlt size={30} />,
    },
  ];

  const checkCoupon = () => {
    return coupons.find(c => c.cupom_name === inputValue);
  };

  const getDiscount = (coupon: Discount_cupom) => {
    const discount = (coupon.discount / 100) * cartProductTotal;
    return discount;
  };

  const handleApplyCoupon = () => {
    const check = checkCoupon();

    if (!check) {
      toast.error('Cupom inválido');
      return;
    }

    setCouponApplied(check);
    setShowCoupon(false);
    setInputValue('');
    toast.success('Cupom aplicado');
  };

  const handleCouponInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setInputValue(event.target.value);
  };

  const toggleCouponInput = () => {
    setShowCoupon(!showCoupon);
  };

  const getAddressInfo = () => {
    const userAddress = address.find(a => a.id === user?.user_Adress_id);
    return userAddress;
  };

  const getTaxa = (district: String | undefined) => {
    if (!district) return;
    const lowercaseAddress = district.toLowerCase();

    const rate = districtRate.some(district =>
      lowercaseAddress.includes(district.toLowerCase()),
    );

    return rate;
  };

  const getTotal = () => {
    let totalValue = cartProductTotal;

    if (couponApplied) {
      totalValue -= getDiscount(couponApplied);
    }

    if (selected === 0) {
      const taxa = getTaxa(getAddressInfo()?.district) ? 6 : 3;
      totalValue += taxa;
    }

    return totalValue;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const typePagament = await getTypePagaments();

        setTypePagament(typePagament);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return {
    getTaxa,
    getTotal,
    toggleCouponInput,
    handleApplyCoupon,
    handleCouponInputChange,
    cart_product,
    deliveryOptions,
    getAddressInfo,
    setSelected,
    selected,
    showCoupon,
    couponApplied,
    inputValue,
    cartProductTotal,
    getDiscount,
    setCouponApplied,
    typePagament,
    selectedTypePagament,
    setSelectedTypePagament,
    onSubmit,
    orderModal,
    handleGetMoreProduct,
    user,
    handleOpenAddressModal,
  };
};
