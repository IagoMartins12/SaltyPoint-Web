import { CouponCard } from '../../CouponCard';
import Modal from '../../Modal';
import { useCoupons } from '@/app/hooks/modals/useModal';
import usePrivateStore from '@/app/hooks/store/usePrivateStore';

export const CouponsModal = () => {
  const couponModal = useCoupons();

  const { coupons } = usePrivateStore();

  const filteredCoupons = coupons.filter(coupon => coupon.type_coupon === 0);

  const body = (
    <div className='flex flex-col w-11/12 mx-auto gap-6'>
      <div className=''>
        <div className='flex flex-col gap-6'>
          {coupons &&
            filteredCoupons.map(coupon => (
              <CouponCard coupon={coupon} key={coupon.id} />
            ))}
        </div>
      </div>
    </div>
  );
  return (
    <>
      <Modal
        onClose={couponModal.onClose}
        body={body}
        isOpen={couponModal.isOpen}
        title='Meus cupons'
      />
    </>
  );
};
