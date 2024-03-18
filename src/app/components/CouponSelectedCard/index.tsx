import { useRewardCartModal } from '@/app/hooks/modals/useCoupon';
import usePrivateStore from '@/app/hooks/store/usePrivateStore';
import { Discount_cupom, User_Rewards } from '@/app/types/ModelsType';
import { formatDate } from '@/app/utils';
import Image from 'next/image';
import toast from 'react-hot-toast';
interface SelectedCouponCardType {
  item?: Discount_cupom;
  reward?: User_Rewards;
}
export const CouponSelectedCard: React.FC<SelectedCouponCardType> = ({
  item,
  reward,
}) => {
  const { cart_product, setCart_product } = usePrivateStore();
  const rewardCartModal = useRewardCartModal();

  const removeItemCart = () => {
    const filteredCart = cart_product.filter(
      item => item.observation !== 'Recompensa',
    );
    setCart_product(filteredCart);
  };
  if (item) {
    return (
      <div
        className={`h-[18vh] sm:h-[15vh] flex border-dashed border-2 w-full cursor-pointer gap-3${
          rewardCartModal.currentItem?.id === item.id
            ? 'border-red-500'
            : 'borderColor'
        }`}
        onClick={() => {
          removeItemCart();
          rewardCartModal.setCurrentItem(item);
          toast.success('Cupom aplicado');
        }}
      >
        <div className='w-4/12 relative flex items-center justify-center'>
          <Image
            src={'/coupon.png'}
            alt='coupon'
            fill
            className='object-fill p-4'
          />
        </div>
        <div className='w-6/12 sm:w-7/12 flex flex-col p-2 justify-between'>
          <div className='flex flex-col'>
            <span className='font-bold text-lg'>
              {item.discount}% de desconto
            </span>
            <span className='font-light text-base'>{item.cupom_name}</span>
          </div>

          {item?.expiration_date ? (
            <div>
              <span className='font-semibold text-lg'>
                Validade:{' '}
                <span className='font-normal text-base'>
                  {formatDate(item.expiration_date.toString())}
                </span>
              </span>
            </div>
          ) : null}
        </div>

        <div className='flex items-center justify-center w-2/12 sm:w-1/12'>
          <div
            className={`w-8 h-8 rounded-full ${
              rewardCartModal.currentItem?.id === item.id
                ? 'bg-red-500'
                : 'bg-slate-200'
            } flex items-center justify-center `}
          >
            <div className='w-4 h-4 rounded-full bg-slate-200 ' />
          </div>
        </div>
      </div>
    );
  }

  if (reward) {
    return (
      <div
        className={`h-[18vh] sm:h-[15vh] flex border-dashed border-2 w-full cursor-pointer ${
          rewardCartModal.currentItem?.id === reward.id
            ? 'border-red-500'
            : 'borderColor'
        }`}
        onClick={() => {
          removeItemCart();
          toast.success('Recompensa aplicado');

          rewardCartModal.setCurrentItem(reward);
        }}
      >
        <div className='w-4/12 relative flex items-center justify-center'>
          <Image
            src={reward.rewardImage}
            alt='coupon'
            fill
            className='object-fill '
          />
        </div>
        <div className='w-6/12 sm:w-7/12 flex flex-col p-2 justify-between'>
          <div className='flex flex-col gap-3'>
            <span className='font-bold text-xl'>{reward.rewardName}</span>
            <span className='font-bold text-lg'>
              {reward.rewardPoints} pontos
            </span>
          </div>

          <div>
            <span className='font-semibold text-lg'>
              Código:{' '}
              <span className='font-normal text-base'>
                {reward.reward_code}
              </span>
            </span>
          </div>
        </div>

        <div className='flex items-center justify-center w-2/12 sm:w-1/12'>
          <div
            className={`w-8 h-8 rounded-full ${
              rewardCartModal.currentItem?.id === reward.id
                ? 'bg-red-500'
                : 'bg-slate-200'
            } flex items-center justify-center `}
          >
            <div className='w-4 h-4 rounded-full bg-slate-200 ' />
          </div>
        </div>
      </div>
    );
  }
};
