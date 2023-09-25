import { useTheme } from 'next-themes';
import { IoCloseOutline } from 'react-icons/io5';
import useCoupons from '@/app/hooks/modals/useCoupons';
import { useEffect, useState } from 'react';
import { Discount_cupom } from '@/app/types/ModelsType';
import { getCoupons } from '@/app/services';
import { CouponCard } from '../../CouponCard';
import useAuth from '@/app/hooks/auth/useAuth';

export const CouponsModal = () => {
  const [coupons, setCoupons] = useState<Discount_cupom[] | []>([]);
  const { theme } = useTheme();
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

  return (
    <div
      className={`menuModalsPosition rounded-md gap-6 ${
        couponModal.isOpen ? 'modal-open' : 'modal-closed'
      } ${theme === 'light' ? 'bg-white' : 'bg-black'}  flex-col z-50 flex`}
    >
      <div className='flex items-center justify-between ml-5 mt-2'>
        <IoCloseOutline
          size={30}
          onClick={() => couponModal.onClose()}
          style={{ cursor: 'pointer' }}
        />
      </div>
      <span className='text-3xl font-semibold mx-auto w-10/12 text-center'>
        Cupons disponiveis
      </span>

      <div className='overflow-auto privacyScroll'>
        <div className='flex flex-col gap-6 w-10/12 mx-auto'>
          {coupons &&
            coupons.map(coupon => (
              <CouponCard coupon={coupon} key={coupon.id} />
            ))}
        </div>
      </div>
    </div>
  );
};
