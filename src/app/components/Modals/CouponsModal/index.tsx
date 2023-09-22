import useAppDownload from '@/app/hooks/modals/useAppDownload';
import { useTheme } from 'next-themes';
import { IoCloseOutline } from 'react-icons/io5';
import { AppleButton, GoogleButton } from '../../Buttons';
import useCoupons from '@/app/hooks/modals/useCoupons';
import { useEffect, useState } from 'react';
import { Discount_cupom } from '@/app/types/ModelsType';
import { getCategories, getCoupons } from '@/app/services';
import { CouponCard } from '../../CouponCard';

export const CouponsModal = () => {
  const [coupons, setCoupons] = useState<Discount_cupom[] | []>([]);
  const { theme } = useTheme();
  const couponModal = useCoupons();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const couponsData = await getCoupons();

        setCoupons(couponsData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      className={`menuModalsPosition rounded-md gap-6 ${
        theme === 'light' ? 'bg-white' : 'bg-black'
      }  flex-col z-50 ${couponModal.isOpen ? 'flex' : 'hidden'}`}
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
          {coupons.map(coupon => (
            <CouponCard coupon={coupon} key={coupon.id} />
          ))}
        </div>
      </div>
    </div>
  );
};
