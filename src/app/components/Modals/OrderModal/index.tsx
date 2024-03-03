import React, { useEffect } from 'react';
import Modal from '../../Modal';
import { CartProductCardOrder } from '../../CartProductCardOrder';
import {
  AiFillCreditCard,
  AiOutlineClose,
  AiOutlineCreditCard,
  AiOutlinePlus,
  AiOutlineSearch,
} from 'react-icons/ai';
import { useCustomOrderModal } from './useCustomOrderModal';
import { MdPix } from 'react-icons/md';
import { FaRegMoneyBillAlt } from 'react-icons/fa';
import { handleSetSelected } from '@/app/utils';
import { APP_SETTINGS } from '@/app/config';
import { AnimationOrder } from '../../Animations/AnimationOrder';
import { useGeneralDataInfo } from '@/app/hooks/generalData';
import toast from 'react-hot-toast';
import {
  usePixModal,
  useChangeDeliveryInfoModal,
} from '@/app/hooks/modals/useModal';
import useGlobalStore from '@/app/hooks/store/useGlobalStore';
import { MdOutlineModeEdit } from 'react-icons/md';
import { BsHash, BsTelephone } from 'react-icons/bs';
import { useRewardCartModal } from '@/app/hooks/modals/useCoupon';
import { RiCoupon3Line } from 'react-icons/ri';
import { Discount_cupom, User_Rewards } from '@/app/types/ModelsType';
import { LuCrown } from 'react-icons/lu';

const OrderModal = () => {
  const {
    cart_product,
    deliveryOptions,
    selected,
    cartProductTotal,
    typePagament,
    orderModal,
    user,
    hasPlayed,
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
  } = useCustomOrderModal();
  const { systemOpening } = useGeneralDataInfo();
  const { generalData } = useGlobalStore();
  const rewardCartModal = useRewardCartModal();

  //@ts-ignore
  const isCoupon = !rewardCartModal.currentItem?.rewardPoints;
  //@ts-ignore
  const isReward = !!rewardCartModal.currentItem?.rewardPoints;

  const userInfo = useChangeDeliveryInfoModal();
  const pixModal = usePixModal();

  const openUserInfo = () => {
    userInfo.onOpen();
  };

  let body = (
    <div className='overflow-auto privacyScroll pb-8'>
      <form
        className='flex flex-col gap-6 mx-auto w-11/12'
        onSubmit={ev => {
          ev.preventDefault();
          if (generalData?.isOpening === false) {
            return toast.error('Sistema indisponivel no momento');
          }
          if (!systemOpening) {
            return toast.error('Não estamos em horario de atendimento');
          }

          onSubmit();
        }}
      >
        <div className='flex flex-col w-full gap-4'>
          {/* Items do pedido */}
          <div className='flex flex-col gap-2'>
            {cart_product.map((cartProduct, i) => (
              <CartProductCardOrder cart_product={cartProduct} key={i} />
            ))}
          </div>

          <div className='flex items-center justify-center gap-3 pb-3 cursor-pointer border-b-2'>
            <AiOutlinePlus size={25} fill='red' />
            <span
              className='font-medium text-lg text-red-500 hover:text-red-400'
              onClick={handleGetMoreProduct}
            >
              Adicionar mais itens
            </span>
          </div>

          <div className='flex gap-2  border-b-2 '>
            <div className='flex justify-between p-4  items-center w-full'>
              <div className='flex gap-4 items-center'>
                <BsTelephone size={30} />
                <div className='flex flex-col gap-1'>
                  <span className='text-medium font-medium'>
                    Telefone para contato
                  </span>
                  {user?.phone ? (
                    <span className='text-sm font-light'>{user?.phone} </span>
                  ) : (
                    <span
                      className='text-sm font-light underline cursor-pointer'
                      onClick={openUserInfo}
                    >
                      Cadastre um telefone
                    </span>
                  )}
                </div>
              </div>

              <div
                className='flex items-center justify-center cursor-pointer'
                onClick={openUserInfo}
              >
                <MdOutlineModeEdit size={20} />
              </div>
            </div>
          </div>

          {/* Opções de entrega */}
          <div className='flex flex-col  border-b-2'>
            {deliveryOptions.map((options, i) => (
              <div className='flex justify-between p-4  items-center' key={i}>
                <div className='flex gap-4 items-center'>
                  {options.icon}
                  <label
                    className='text-medium font-medium'
                    htmlFor='deliveryOption'
                  >
                    {options.name}

                    {options.name === 'Delivery' && getAddressInfo() && (
                      <div className='flex flex-col'>
                        <span className='text-sm font-light'>
                          {getAddressInfo()?.address},{' '}
                          {getAddressInfo()?.number}
                        </span>
                        <span className='text-sm font-light'>
                          {getAddressInfo()?.district}
                        </span>
                        <span className='text-sm font-light'>
                          {getAddressInfo()?.city} / {getAddressInfo()?.uf}
                        </span>

                        <span className='text-sm font-light'>
                          {getAddressInfo()?.reference}
                        </span>
                      </div>
                    )}

                    {options.name === 'Retirar na loja' && (
                      <div className='flex flex-col'>
                        <span className='text-sm font-light'>
                          Estrada de ligação, 22
                        </span>
                        <span className='text-sm font-light'>
                          Residencial Sol Nascente
                        </span>
                        <span className='text-sm font-light'>
                          São paulo / SP
                        </span>

                        <span className='text-sm font-light'>
                          {getAddressInfo()?.reference}
                        </span>
                      </div>
                    )}
                  </label>
                </div>

                <div className='flex gap-4 items-center justify-center'>
                  {i === 0 ? (
                    <div
                      className='flex items-center justify-center'
                      onClick={openUserInfo}
                    >
                      <MdOutlineModeEdit size={15} />
                    </div>
                  ) : null}
                  <input
                    type='radio'
                    name='deliveryOption'
                    className='accent-red-600 w-4 h-4'
                    onClick={ev => {
                      if (i === 0 && !user?.user_Adress_id) {
                        ev.preventDefault();
                        handleOpenAddressModal();
                      } else {
                        setSelected(i);
                        handleSetSelected('payment');
                      }
                    }}
                    required
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Opções de pagamento */}
          <div className='flex flex-col gap-2 border-b-2'>
            {typePagament.map((options, i) => (
              <div
                className='flex justify-between p-4  items-center'
                key={i}
                id='payment'
              >
                <div className='flex gap-4 items-center'>
                  {options.type_pagament_name
                    .toUpperCase()
                    .includes('CREDITO') && <AiOutlineCreditCard size={30} />}

                  {options.type_pagament_name
                    .toUpperCase()
                    .includes('DEBITO') && <AiFillCreditCard size={30} />}

                  {options.type_pagament_name
                    .toUpperCase()
                    .includes('DINHEIRO') && <FaRegMoneyBillAlt size={30} />}

                  {options.type_pagament_name.toUpperCase().includes('PIX') && (
                    <MdPix size={30} />
                  )}
                  <label
                    className='text-medium font-medium'
                    htmlFor='deliveryOption'
                  >
                    {options.type_pagament_name}
                  </label>
                </div>

                <input
                  type='radio'
                  name='pagamentOption'
                  className='accent-red-600 w-4 h-4'
                  onClick={() => {
                    if (options.type_pagament_name.includes('Pix')) {
                      pixModal.onOpen();
                    }
                    setSelectedTypePagament(options.id);
                    handleSetSelected('total');
                  }}
                  required
                />
              </div>
            ))}
          </div>

          {/* Cupom e recompensa */}
          <div className='flex flex-col'>
            <div className='flex justify-between px-2 items-center w-full'>
              <div className='flex gap-4 items-center w-full'>
                {rewardCartModal.currentItem ? (
                  isCoupon ? (
                    <div className='flex items-center justify-center gap-4'>
                      <RiCoupon3Line size={30} />

                      <div className='flex flex-col '>
                        <span className='text-medium font-medium'>
                          {
                            (rewardCartModal.currentItem as Discount_cupom)
                              .cupom_name
                          }
                        </span>
                        <span className='text-sm font-medium '>
                          {
                            (rewardCartModal.currentItem as Discount_cupom)
                              .discount
                          }{' '}
                          % de desconto
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className='flex items-center justify-center gap-4'>
                      <LuCrown size={30} />

                      <div className='flex flex-col '>
                        <span className='text-medium font-medium'>
                          {
                            (rewardCartModal.currentItem as User_Rewards)
                              .rewardName
                          }
                        </span>
                        <span className='text-sm font-medium '>
                          #
                          {
                            (rewardCartModal.currentItem as User_Rewards)
                              .reward_code
                          }{' '}
                        </span>
                      </div>
                    </div>
                  )
                ) : (
                  <div className='flex items-center justify-center gap-4'>
                    <BsHash size={30} />

                    <label
                      className='text-medium font-medium'
                      htmlFor='deliveryOption'
                    >
                      Código
                    </label>
                  </div>
                )}
              </div>
              <div className=' flex justify-end'>
                {rewardCartModal.currentItem ? (
                  <div className='flex gap-3 w-full justify-end'>
                    <div
                      className='flex gap-3 items-center'
                      onClick={ev => {
                        ev.preventDefault();
                        rewardCartModal.onOpen();
                      }}
                    >
                      <AiOutlineClose size={20} className='cursor-pointer' />
                    </div>
                  </div>
                ) : (
                  <button
                    className='px-3 py-2 text-center bg-red-400 rounded-xl'
                    onClick={ev => {
                      ev.preventDefault();
                      rewardCartModal.onOpen();
                    }}
                  >
                    <span className='text-medium  font-semibold'>
                      Adicionar{' '}
                    </span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Informações gerais */}
          <div className='flex flex-col gap-2' id='total'>
            <div className='flex justify-between px-2 '>
              <span className='text-base font-light'>Subtotal: </span>
              <span className='text-base font-light text-gray-400'>
                R$ {cartProductTotal.toFixed(2)}
              </span>
            </div>

            {rewardCartModal.currentItem && isCoupon && (
              <div className='flex justify-between px-2 '>
                <span className='text-base font-light'>Cupom: </span>
                <span className='text-base font-light text-green-500'>
                  - R${' '}
                  {getDiscount(
                    (rewardCartModal.currentItem as Discount_cupom).discount,
                  ).toFixed(2)}
                </span>
              </div>
            )}
            {rewardCartModal.currentItem &&
              isReward &&
              (rewardCartModal.currentItem as User_Rewards).rewardType ===
                0 && (
                <div className='flex justify-between px-2 '>
                  <span className='text-base font-light'>Cupom: </span>
                  <span className='text-base font-light text-green-500'>
                    - R${' '}
                    {getDiscount(
                      (rewardCartModal.currentItem as User_Rewards)
                        .rewardDiscount,
                    ).toFixed(2)}
                  </span>
                </div>
              )}

            {selected === 0 && (
              <div className='flex justify-between px-2 '>
                <span className='text-base font-light'>Taxa: </span>
                <span className='text-base font-light text-gray-400'>
                  R${' '}
                  {getTaxa(getAddressInfo()?.district)
                    ? APP_SETTINGS.taxaForaSolNascente.toFixed(2)
                    : APP_SETTINGS.taxaSolNascente.toFixed(2)}
                </span>
              </div>
            )}

            <div className='flex justify-between px-2 '>
              <span className='text-2xl font-light'>Total: </span>
              <span className='text-2xl font-light '>
                R$ {getTotal().toFixed(2)}
              </span>
            </div>
          </div>

          <button className='px-2 my-2 py-2 text-center w-full bg-red-400 rounded-xl'>
            <span className='text-lg font-medium'>Fazer pedido</span>
          </button>
        </div>
      </form>
    </div>
  );

  if (hasPlayed) {
    body = <AnimationOrder setHasPlayed={setHasPlayed} />;
  }

  const onClose = () => {
    setHasPlayed(false);
    rewardCartModal.setCurrentItem(null);
    orderModal.onClose();
  };

  return (
    <>
      <Modal
        onClose={onClose}
        body={body}
        title='Meu pedido'
        isOpen={orderModal.isOpen}
      />
    </>
  );
};

export default OrderModal;
