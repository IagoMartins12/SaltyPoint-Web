import React from 'react';
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

const OrderModal = () => {
  const {
    getTaxa,
    getTotal,
    handleApplyCoupon,
    handleCouponInputChange,
    toggleCouponInput,
    cart_product,
    deliveryOptions,
    getAddressInfo,
    setSelected,
    selected,
    couponApplied,
    showCoupon,
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
  } = useCustomOrderModal();

  const body = (
    <div className='overflow-auto privacyScroll pb-8'>
      <form
        className='flex flex-col gap-6 mx-auto w-11/12'
        onSubmit={ev => {
          ev.preventDefault();
          onSubmit();
        }}
      >
        <div className='flex flex-col w-full gap-4'>
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
              Adicionar mais itens{' '}
            </span>
          </div>

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

                    {options.name === 'Retirar na loja' && getAddressInfo() && (
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

                <input
                  type='radio'
                  name='deliveryOption'
                  className='accent-red-600 w-4 h-4'
                  onClick={() => {
                    if (i === 0 && !user?.user_Adress_id) {
                      handleOpenAddressModal();
                    } else {
                      setSelected(i);
                      handleSetSelected('payment');
                    }
                  }}
                  required
                  defaultChecked={
                    selected === i && (i !== 0 || !user?.user_Adress_id)
                  }
                />
              </div>
            ))}
          </div>

          <div className='flex flex-col gap-2 border-b-2'>
            {/* <span className='text-lg font-light px-4'> Pagamento</span> */}
            {typePagament.map((options, i) => (
              <div
                className='flex justify-between p-4  items-center'
                key={i}
                id='payment'
              >
                <div className='flex gap-4 items-center'>
                  {options.type_pagament_name.includes('credito') && (
                    <AiOutlineCreditCard size={30} />
                  )}
                  {options.type_pagament_name.includes('debito') && (
                    <AiFillCreditCard size={30} />
                  )}
                  {options.type_pagament_name.includes('Dinheiro') && (
                    <FaRegMoneyBillAlt size={30} />
                  )}
                  {options.type_pagament_name.includes('Pix') && (
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
                    setSelectedTypePagament(options.id);
                    handleSetSelected('total');
                  }}
                  required
                />
              </div>
            ))}
          </div>

          <div className='flex flex-col'>
            <div className='flex justify-between px-2 items-center w-full'>
              <span className='text-base font-light w-4/12'>
                Cupom de desconto:{' '}
              </span>
              <div className=' w-8/12 flex justify-end'>
                {showCoupon ? (
                  <div className='flex gap-3 w-full justify-end'>
                    <input
                      type='text'
                      className='w-5/12  py-1 border-b-2 px-2 text-sm'
                      value={inputValue}
                      onChange={handleCouponInputChange}
                    />

                    <div className='flex gap-3 items-center'>
                      <AiOutlineClose
                        size={20}
                        onClick={toggleCouponInput}
                        className='cursor-pointer'
                      />
                      <AiOutlineSearch
                        size={20}
                        onClick={handleApplyCoupon}
                        className='cursor-pointer'
                      />
                    </div>
                  </div>
                ) : couponApplied ? (
                  <div className='flex items-center gap-3'>
                    <button
                      className='px-3 py-2 text-center rounded-xl'
                      onClick={toggleCouponInput}
                    >
                      <span>{couponApplied.cupom_name} </span>
                    </button>
                    <AiOutlineClose
                      size={20}
                      onClick={() => setCouponApplied(null)}
                      className='cursor-pointer'
                    />
                  </div>
                ) : (
                  <button
                    className='px-3 py-2 text-center bg-red-300 rounded-xl'
                    onClick={toggleCouponInput}
                  >
                    <span>Adicionar </span>
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className='flex flex-col gap-2' id='total'>
            <div className='flex justify-between px-2 '>
              <span className='text-base font-light'>Subtotal: </span>
              <span className='text-base font-light text-gray-400'>
                R$ {cartProductTotal.toFixed(2)}
              </span>
            </div>

            {couponApplied && (
              <div className='flex justify-between px-2 '>
                <span className='text-base font-light'>Cupom: </span>
                <span className='text-base font-light text-green-500'>
                  - R$ {getDiscount(couponApplied).toFixed(2)}
                </span>
              </div>
            )}

            {selected === 0 && (
              <div className='flex justify-between px-2 '>
                <span className='text-base font-light'>Taxa: </span>
                <span className='text-base font-light text-gray-400'>
                  R$ {getTaxa(getAddressInfo()?.district) ? '6.00' : '3.00'}
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

  return (
    <>
      <Modal
        onClose={orderModal.onClose}
        body={body}
        title='Meu pedido'
        isOpen={orderModal.isOpen}
      />
    </>
  );
};

export default OrderModal;
