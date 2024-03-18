import { OrderComponentType } from '@/app/types/ComponentTypes';

import usePrivateStore from '@/app/hooks/store/usePrivateStore';
import { OrderInfo } from '../Span';
import { formatOrderDate } from '@/app/utils';
import useGlobalStore from '@/app/hooks/store/useGlobalStore';
import { APP_SETTINGS } from '@/app/config';

export const CurrentOrderInfo: React.FC<OrderComponentType> = ({ order }) => {
  const { address } = usePrivateStore();
  const { typePagament, states } = useGlobalStore();

  const { generalData } = useGlobalStore();
  const getSubtotal = () => {
    const subtotal = order.orderItems.reduce((total, item) => {
      return total + parseFloat(item.value);
    }, 0);

    return subtotal;
  };

  const getAddressInfo = () => {
    return address.find(a => a.id === order?.user_adress_id);
  };

  const getTaxa = (district: String | undefined) => {
    if (!district) return;
    const lowercaseAddress = district.toLowerCase();

    const rate = APP_SETTINGS.districtRate.some(district =>
      lowercaseAddress.includes(district.toLowerCase()),
    );

    return rate;
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

  const getState = () => {
    return (
      states.find(s => s.id === order.state_id)?.state_name ??
      'Status desconhecido'
    );
  };

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-col gap-2' id='total'>
        <div className='flex justify-between  '>
          <span className='text-base font-light'>Subtotal: </span>
          <span className='text-base font-light text-gray-400'>
            R$ {getSubtotal().toFixed(2)}
          </span>
        </div>

        {order.discount_coupon_id && (
          <div className='flex justify-between  '>
            <span className='text-base font-light'>Cupom: </span>
            <span className='text-base font-light text-green-500'>
              - R$ {order.discount_value?.toFixed(2)}
            </span>
          </div>
        )}

        {order.reward_id && order.discount_value !== 0 && (
          <div className='flex justify-between  '>
            <span className='text-base font-light'>Recompensa: </span>
            <span className='text-base font-light text-green-500'>
              - R$ {order.discount_value?.toFixed(2)}
            </span>
          </div>
        )}

        {order.user_adress_id && (
          <div className='flex justify-between  '>
            <span className='text-base font-light'>Taxa: </span>
            <span className='text-base font-light text-gray-400'>
              R${' '}
              {getTaxa(getAddressInfo()?.district)
                ? generalData?.deliveryFeeOutside.toFixed(2)
                : generalData?.deliveryFeeInside.toFixed(2)}
            </span>
          </div>
        )}

        <div className='flex justify-between  '>
          <span className='text-2xl font-light'>Total: </span>
          <span className='text-2xl font-light '>
            R$ {order.total_amount.toFixed(2)}
          </span>
        </div>
      </div>

      <div className='flex flex-col gap-2'>
        {order.user_adress_id ? (
          <OrderInfo label='Entrega em' content={getFullAddressInfo()} />
        ) : (
          <OrderInfo
            label='Retirada em'
            content='Estrada de ligação, 22 - Residencial Sol Nascente - São Paulo / SP'
          />
        )}
        {getAddressInfo()?.reference && (
          <span className='text-base font-normal pb-2 border-b-2'>
            Ponto de referencia: {getAddressInfo()?.reference}{' '}
          </span>
        )}
      </div>

      <OrderInfo
        label='Data do pedido'
        content={formatOrderDate(order.order_date)}
      />

      <OrderInfo label='Forma de pagamento' content={getTypePagament()} />

      <OrderInfo label='Status do pedido' content={getState()} />

      <OrderInfo label='Numero de contato' content={order.contact_phone} />
    </div>
  );
};
