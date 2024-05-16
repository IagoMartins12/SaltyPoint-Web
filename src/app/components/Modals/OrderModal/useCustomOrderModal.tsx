import { APP_SETTINGS } from '@/app/config';
import { useRewardCartModal } from '@/app/hooks/modals/useCoupon';
import {
  useAddress,
  useOrderModal,
  useUserInfoModal,
} from '@/app/hooks/modals/useModal';
import useGlobalStore from '@/app/hooks/store/useGlobalStore';
import usePrivateStore from '@/app/hooks/store/usePrivateStore';
import {
  addCartProduct,
  createOrder,
  getCartProduct,
  getEstimativeDate,
  getGeneralData,
  getTypePagaments,
} from '@/app/services';
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
  const [estimativeDate, setEstimativeData] = useState<null | string>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [typePagament, setTypePagament] = useState<Type_Pagament[] | []>([]);
  const [selectedTypePagament, setSelectedTypePagament] = useState<
    null | string
  >(null);
  const [hasPlayed, setHasPlayed] = useState(false);
  const rewardCartModal = useRewardCartModal();

  //@ts-ignore
  const isCoupon = !rewardCartModal.currentItem?.rewardPoints;
  //@ts-ignore
  const isReward = !!rewardCartModal.currentItem?.rewardPoints;
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

  const { products, setGeneralData } = useGlobalStore();

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
      // orderModal.onClose();
      return addressModal.onOpen();
    }

    if (address.length !== 0 && !user?.user_Adress_id) {
      toast.error('É necessario vincular um endereço a sua conta ');
      // orderModal.onClose();
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

    if (
      rewardCartModal.currentItem &&
      (rewardCartModal.currentItem as User_Rewards).rewardType === 1
    ) {
      const newItem = products.find(
        product =>
          product.id ===
          (rewardCartModal.currentItem as User_Rewards).rewardProductId,
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
      discount_coupon_id:
        rewardCartModal.currentItem && isCoupon
          ? rewardCartModal.currentItem.id
          : null,
      state_id: '6526e4b833e69bf2bb97bc9e', //Em análise,
      discount_value:
        rewardCartModal.currentItem && isCoupon
          ? getDiscount(
              (rewardCartModal.currentItem as Discount_cupom).discount,
            )
          : isReward &&
            (rewardCartModal.currentItem as User_Rewards).rewardType === 0
          ? getDiscount(
              (rewardCartModal.currentItem as User_Rewards).rewardDiscount,
            )
          : 0,
      contact_phone: user.phone,
      reward_id:
        rewardCartModal.currentItem && isReward
          ? rewardCartModal.currentItem.id
          : null,
    } as CreateOrderDto);

    console.log('response', response);
    if (response) {
      const newOrder = { ...response, orderItems: cart_product };
      const updatedOrders = [...orders, newOrder];
      setHasPlayed(true);
      if (rewardCartModal.currentItem && isCoupon) {
        const filteredCoupons = coupons.filter(
          c => c.id !== rewardCartModal.currentItem?.id,
        );
        setCoupons(filteredCoupons);
        rewardCartModal.setCurrentItem(null);
      }

      if (rewardCartModal.currentItem && isReward) {
        const filteredRewards = userReward.filter(
          c => c.id !== rewardCartModal.currentItem?.id,
        );
        setUserReward(filteredRewards);
        rewardCartModal.setCurrentItem(null);
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

  const getDiscount = (discount: number) => {
    const orderDiscount = (discount / 100) * cartProductTotal;
    return orderDiscount;
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

    if (rewardCartModal.currentItem && isCoupon) {
      totalValue -= getDiscount(
        (rewardCartModal.currentItem as Discount_cupom).discount,
      );
    }

    if (
      rewardCartModal.currentItem &&
      isReward &&
      (rewardCartModal.currentItem as User_Rewards).rewardType === 0
    ) {
      totalValue -= getDiscount(
        (rewardCartModal.currentItem as User_Rewards).rewardDiscount,
      );
    }

    if (selected === 0) {
      const taxa = getTaxa(getAddressInfo()?.district) ? 6 : 3;
      totalValue += taxa;
    }

    return totalValue;
  };

  const addItemToCart = async (product: Product, isOrdered = false) => {
    const checkSize = (rewardCartModal.currentItem as User_Rewards)?.rewardName
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

  const fetchData = async () => {
    try {
      const typePagament = await getTypePagaments();

      setTypePagament(typePagament);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCart = async () => {
    try {
      const cart = await getCartProduct();
      const generalData = await getGeneralData();

      setCart_product(cart);
      setGeneralData(generalData);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchEstimateData = async () => {
    try {
      const estimateNumber = await getEstimativeDate();
      const currentTime = new Date();

      // Adiciona o estimateNumber à hora atual
      const estimatedTimeStart = new Date(
        currentTime.getTime() + estimateNumber * 60000,
      );

      // Adiciona 20 minutos ao tempo estimado para obter o horário final
      const estimatedTimeEnd = new Date(
        estimatedTimeStart.getTime() + 20 * 60000,
      );

      // Formata os horários para o formato desejado (HH:MM)
      const formattedStartTime = `${String(
        estimatedTimeStart.getHours(),
      ).padStart(2, '0')}:${String(estimatedTimeStart.getMinutes()).padStart(
        2,
        '0',
      )}`;
      const formattedEndTime = `${String(estimatedTimeEnd.getHours()).padStart(
        2,
        '0',
      )}:${String(estimatedTimeEnd.getMinutes()).padStart(2, '0')}`;

      // Combina os horários formatados em um intervalo
      const finalEstimatedTime = `${formattedStartTime} - ${formattedEndTime}`;

      setEstimativeData(finalEstimatedTime);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (
      rewardCartModal.currentItem &&
      isReward &&
      (rewardCartModal.currentItem as User_Rewards).rewardType === 1
    ) {
      const newItem = products.find(
        product =>
          product.id ===
          (rewardCartModal.currentItem as User_Rewards).rewardProductId,
      );

      if (newItem) {
        addItemToCart(newItem);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rewardCartModal.currentItem]);

  useEffect(() => {
    if (user) {
      fetchCart();
      fetchEstimateData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderModal.isOpen]);

  return {
    cart_product,
    deliveryOptions,
    selected,
    cartProductTotal,
    typePagament,
    orderModal,
    user,
    hasPlayed,
    estimativeDate,
    getAddressInfo,
    setSelected,
    getTaxa,
    getTotal,
    getDiscount,
    setSelectedTypePagament,
    handleGetMoreProduct,
    handleOpenAddressModal,
    onSubmit,
    setHasPlayed,
  };
};
