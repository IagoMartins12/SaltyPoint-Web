import { APP_SETTINGS } from '@/app/config';
import {
  useAddress,
  useOrderModal,
  useUserInfoModal,
} from '@/app/hooks/modals/useModal';
import useGlobalStore from '@/app/hooks/store/useGlobalStore';
import usePrivateStore from '@/app/hooks/store/usePrivateStore';
import { addCartProduct, createOrder, getTypePagaments } from '@/app/services';
import { CartProductDto, CreateOrderDto } from '@/app/types/Dtos';
import {
  Cart_product,
  Discount_cupom,
  Product,
  Type_Pagament,
  User_Rewards,
} from '@/app/types/ModelsType';
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
  const [rewardApplied, setRewardApplied] = useState<User_Rewards | null>(null);
  const [typePagament, setTypePagament] = useState<Type_Pagament[] | []>([]);
  const [selectedTypePagament, setSelectedTypePagament] = useState<
    null | string
  >(null);
  const [hasPlayed, setHasPlayed] = useState(false);

  const {
    cart_product,
    coupons,
    user,
    address,
    orders,
    userReward,
    setOrders,
    setCart_product,
    setCoupons,
    setUserReward,
  } = usePrivateStore();

  const { products } = useGlobalStore();

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

  const onSubmit = async () => {
    if (!user?.phone) {
      toast.error('Por favor, insira um telefone antes de finalizar o pedido');
      orderModal.onClose();
      userInfo.onOpen();
      return;
    }

    if (rewardApplied && rewardApplied.rewardType === 1) {
      const newItem = products.find(
        product => product.id === rewardApplied.rewardProductId,
      );

      if (newItem) {
        addItemToCart(newItem, true);
      }
    }

    const response = await createOrder({
      total_amount: getTotal(),
      type_pagament_id: selectedTypePagament,
      user_adress_id: selected === 0 ? user.user_Adress_id : null,
      type_delivery: selected === 0 ? 0 : 1,
      discount_coupon_id: couponApplied ? couponApplied.id : null,
      state_id: '6526e4b833e69bf2bb97bc9e', //Em análise,
      discount_value: couponApplied
        ? getDiscount(couponApplied.discount)
        : rewardApplied && rewardApplied.rewardType === 0
        ? getDiscount(rewardApplied.rewardDiscount)
        : 0,
      contact_phone: user.phone,
      reward_id: rewardApplied ? rewardApplied.id : null,
    } as CreateOrderDto);

    if (response) {
      const newOrder = { ...response, orderItems: cart_product };
      const updatedOrders = [...orders, newOrder];
      setHasPlayed(true);

      if (couponApplied) {
        const filteredCoupons = coupons.filter(c => c.id !== couponApplied.id);
        setCoupons(filteredCoupons);
        setCouponApplied(null);
      }

      if (rewardApplied) {
        const filteredRewards = userReward.filter(
          c => c.id !== rewardApplied.id,
        );
        setUserReward(filteredRewards);
        setRewardApplied(null);
      }
      setCart_product([]);
      setOrders(updatedOrders);
      return;
    } else {
      toast.error('Erro ao fazer pedido');
    }
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

  const checkReward = () => {
    return userReward.find(c => c.reward_code === inputValue);
  };

  const getDiscount = (discount: number) => {
    const orderDiscount = (discount / 100) * cartProductTotal;
    return orderDiscount;
  };
  const handleApplyCoupon = () => {
    const checkIfCouponExists = checkCoupon();
    const checkIfRewardExists = checkReward();

    if (!checkIfCouponExists && !checkIfRewardExists) {
      return toast.error('Código inválido');
    }

    if (checkIfCouponExists) {
      setCouponApplied(checkIfCouponExists);
      setShowCoupon(false);
      setInputValue('');
      toast.success('Cupom aplicado');
    } else if (checkIfRewardExists) {
      // Lógica para aplicar a recompensa, se necessário
      setRewardApplied(checkIfRewardExists);
      setShowCoupon(false);
      setInputValue('');
      toast.success('Recompensa aplicada');
    }
  };

  const handleCouponInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setInputValue(event.target.value);
  };

  const toggleCouponInput = () => {
    setInputValue('');
    setShowCoupon(!showCoupon);
  };

  const toogleRewardInput = () => {
    setInputValue('');
    if (rewardApplied && rewardApplied.rewardType === 1) {
      const filteredCart = cart_product.filter(
        cart => cart.observation !== 'Recompensa',
      );
      setCart_product(filteredCart);
    }
    setRewardApplied(null);
  };

  const getAddressInfo = () => {
    const userAddress = address.find(a => a.id === user?.user_Adress_id);
    return userAddress;
  };

  const getTaxa = (district: String | undefined) => {
    if (!district) return;
    const lowercaseAddress = district.toLowerCase();

    const rate = APP_SETTINGS.districtRate.some(district =>
      lowercaseAddress.includes(district.toLowerCase()),
    );

    return rate;
  };

  const getTotal = () => {
    let totalValue = cartProductTotal;

    if (couponApplied) {
      totalValue -= getDiscount(couponApplied.discount);
    }

    if (rewardApplied && rewardApplied.rewardType === 0) {
      totalValue -= getDiscount(rewardApplied.rewardDiscount);
    }

    if (selected === 0) {
      const taxa = getTaxa(getAddressInfo()?.district) ? 6 : 3;
      totalValue += taxa;
    }

    return totalValue;
  };

  const addItemToCart = async (product: Product, isOrdered = false) => {
    const checkSize = rewardApplied?.rewardName
      .toUpperCase()
      .includes('BROTINHO');
    const newCart = {
      product_id: product.id,
      quantity: 1,
      observation: 'Recompensa',
      value: '0',
      size: checkSize ? 1 : 0,
    } as Cart_product;

    if (isOrdered) {
      const response = await addCartProduct({
        product_id: product.id,
        observation: 'Recompensa',
        quantity: 1,
        value: '0',
      } as CartProductDto);
      return response;
    }

    const updatedCartProduct = [...cart_product, newCart];
    setCart_product(updatedCartProduct);
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

  useEffect(() => {
    if (rewardApplied) {
      if (rewardApplied.rewardType === 0) {
        const orderDiscount = getDiscount(rewardApplied.rewardDiscount);
        console.log('orderDiscount', orderDiscount);
      }

      if (rewardApplied.rewardType === 1) {
        const newItem = products.find(
          product => product.id === rewardApplied.rewardProductId,
        );

        if (newItem) {
          addItemToCart(newItem);
        }
      }
    }
  }, [rewardApplied]);

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
    setSelectedTypePagament,
    onSubmit,
    orderModal,
    handleGetMoreProduct,
    user,
    handleOpenAddressModal,
    rewardApplied,
    toogleRewardInput,
    hasPlayed,
    setHasPlayed,
  };
};
