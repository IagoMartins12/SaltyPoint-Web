import { CouponCardType } from '@/app/types/ComponentTypes';
import { formatDate } from '@/app/utils';
import Image from 'next/image';
import toast from 'react-hot-toast';

export const CouponCard: React.FC<CouponCardType> = ({ coupon }) => {
  const handleCopyLink = () => {
    navigator.clipboard.writeText(coupon.cupom_name);
    toast.success('Copiado!');
  };

  return (
    <div
      className='min-h-[15vh] flex border-dashed border-2 w-full cursor-pointer'
      onClick={handleCopyLink}
    >
      <div className='w-4/12 relative flex items-center justify-center'>
        <Image src={'/coupon.png'} alt='coupon' width={100} height={100} />
      </div>
      <div className='w-8/12 flex flex-col p-2 justify-between'>
        <div className='flex flex-col'>
          <span className='font-bold text-lg'>
            {coupon.discount}% de desconto
          </span>
          <span className='font-light text-base'>{coupon.cupom_name}</span>
        </div>

        <div>
          <span className='font-semibold text-lg'>
            Validade:{' '}
            <span className='font-normal text-base'>
              {formatDate(coupon.expiration_date.toString())}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};
