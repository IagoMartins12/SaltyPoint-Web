import { OrderComponentType } from '@/app/types/ComponentTypes';

import usePrivateStore from '@/app/hooks/store/usePrivateStore';
import { districtRate } from '../Modals/OrderModal/useCustomOrderModal';
import { OrderInfo } from '../Span';
import { formatOrderDate } from '@/app/utils';
import useGlobalStore from '@/app/hooks/store/useGlobalStore';

export const CurrentOrderInfo: React.FC<OrderComponentType> = ({ order }) => {
  const { coupons, address } = usePrivateStore();
  const { typePagament } = useGlobalStore();

  const getSubtotal = () => {
    if (!order.user_adress_id) return order.total_amount;

    const addressInfo = getAddressInfo();
    const taxa = getTaxa(addressInfo?.district) ? 6 : 3;

    return order.total_amount - taxa;
  };

  const getDiscount = () => {
    const coupon = coupons.find(c => c.id === order.discount_coupon_id);

    if (!coupon) return 0;
    const discount = (coupon.discount / 100) * order.total_amount;
    return discount;
  };

  const getAddressInfo = () => {
    return address.find(a => a.id === order?.user_adress_id);
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
    let totalValue = getSubtotal();

    if (order.discount_coupon_id) {
      totalValue -= getDiscount();
    }

    if (order.user_adress_id) {
      const taxa = getTaxa(getAddressInfo()?.district) ? 6 : 3;
      totalValue += taxa;
    }

    return totalValue;
  };

  const getFullAddressInfo = () => {
    const addr = address.find(a => a.id === order?.user_adress_id);

    if (!addr) return 'Endereço não encontrado';

    return `${addr.address}, ${addr.number} - ${addr.district} - ${addr.city} / ${addr.uf}`;
  };

  const getTypePagament = () => {
    return (
      typePagament.find(type => type.id === order.type_pagament_id)
        ?.type_pagament_name ?? 'Forma de pagamento não encontrada'
    );
  };

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-col gap-2' id='total'>
        <div className='flex justify-between px-2 '>
          <span className='text-base font-light'>Subtotal: </span>
          <span className='text-base font-light text-gray-400'>
            R$ {getSubtotal().toFixed(2)}
          </span>
        </div>

        {order.discount_coupon_id && (
          <div className='flex justify-between px-2 '>
            <span className='text-base font-light'>Cupom: </span>
            <span className='text-base font-light text-green-500'>
              - R$ {getDiscount().toFixed(2)}
            </span>
          </div>
        )}

        {order.user_adress_id && (
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

      <div className='flex flex-col gap-2'>
        {order.user_adress_id ? (
          <OrderInfo label='Entrega em' content={getFullAddressInfo()} />
        ) : (
          <OrderInfo label='' content='Retirada no balcão' />
        )}
        {getAddressInfo()?.reference && (
          <span className='text-base font-normal'>
            {' '}
            Ponto de referencia: {getAddressInfo()?.reference}{' '}
          </span>
        )}
      </div>

      <OrderInfo
        label='Data do pedido'
        content={formatOrderDate(order.order_date)}
      />

      <OrderInfo label='Forma de pagamento' content={getTypePagament()} />

      <OrderInfo label='Status do pedido' content={getTypePagament()} />
    </div>
  );
};
