import useCoupons from '@/app/hooks/modals/useCoupons';
import { useEffect, useState } from 'react';
import { Discount_cupom } from '@/app/types/ModelsType';
import { getCoupons } from '@/app/services';
import { CouponCard } from '../../CouponCard';
import useAuth from '@/app/hooks/auth/useAuth';
import Modal from '../Modal';

export const CouponsModal = () => {
  const [coupons, setCoupons] = useState<Discount_cupom[] | []>([]);
  const couponModal = useCoupons();
  const { isLogged } = useAuth();

  useEffect(() => {
    if (isLogged) {
      const fetchData = async () => {
        try {
          const couponsData = await getCoupons();

          setCoupons(couponsData);
        } catch (error) {
          console.log(error);
        }
      };

      fetchData();
    }
  }, [isLogged]);

  const body = (
    <div className='flex flex-col w-11/12 mx-auto gap-6'>
      <div className=''>
        <div className='flex flex-col gap-6'>
          {coupons &&
            coupons.map(coupon => (
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
