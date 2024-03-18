'use client';

import { useState, useEffect } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import toast from 'react-hot-toast';
import Modal from '../../Modal';
import { AnimationEmpty } from '../../Animations/AnimationEmpty';
import { CouponSelectedCard } from '../../CouponSelectedCard';
import { useRewardCartModal } from '@/app/hooks/modals/useCoupon';
import usePrivateStore from '@/app/hooks/store/usePrivateStore';
import { Discount_cupom } from '@/app/types/ModelsType';
import Image from 'next/image';

const RewardCartModal = () => {
  const [isActive, setIsActive] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [myCoupons, setMyCoupons] = useState<Discount_cupom[] | null>(null);

  const { userReward, coupons } = usePrivateStore();
  const rewardCartModal = useRewardCartModal();

  const options = [{ name: 'Cupons' }, { name: 'Recompensas' }];

  const onClose = () => {
    setInputValue('');
    rewardCartModal.onClose();
  };
  const checkCoupon = () => {
    const coupon = coupons.find(c => c.cupom_name === inputValue);
    if (coupon) {
      const changeTypeCoupon = coupons.map(c => {
        return {
          ...c,
          type_coupon: c.id === coupon?.id ? 0 : c.type_coupon,
        };
      });
      setMyCoupons(changeTypeCoupon);
      rewardCartModal.setCurrentItem(coupon);
      return toast.success('Cupom encontrado');
    } else {
      toast.error('Cupom não encontrado');
    }
  };

  const renderNullCard = (
    <div
      className={`h-[12vh] flex border-dashed border-2 w-full cursor-pointer ${
        rewardCartModal.currentItem === null ? 'border-red-500' : 'borderColor'
      }`}
      onClick={() => {
        rewardCartModal.setCurrentItem(null);
      }}
    >
      <div className='w-4/12 relative flex items-center justify-center'>
        <Image
          src={'/noCoupon.png'}
          alt='coupon'
          fill
          className='object-fill '
        />
      </div>
      <div className='w-6/12 sm:w-7/12 flex flex-col p-2 justify-center'>
        <div className='flex flex-col gap-3'>
          <span className='font-bold text-xl'>Sem desconto</span>
        </div>
      </div>

      <div className='flex items-center justify-center w-2/12 sm:w-1/12'>
        <div
          className={`w-8 h-8 rounded-full ${
            rewardCartModal.currentItem === null ? 'bg-red-500' : 'bg-slate-200'
          } flex items-center justify-center `}
        >
          <div className='w-4 h-4 rounded-full bg-slate-200 ' />
        </div>
      </div>
    </div>
  );

  useEffect(() => {
    const filteredCoupons = coupons.filter(coupon => coupon.type_coupon === 0);
    setMyCoupons(filteredCoupons);
  }, [coupons]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const renderCouponCards = () => {
    if (!myCoupons) return null;
    const filteredCoupons = myCoupons.filter(c =>
      c.cupom_name.toUpperCase().includes(inputValue.toUpperCase()),
    );
    if (filteredCoupons.length === 0) {
      return <AnimationEmpty text='Nenhum cupom disponível no momento' />;
    }
    return filteredCoupons.map(coupon => (
      <CouponSelectedCard item={coupon} key={coupon.id} />
    ));
  };

  return (
    <Modal
      onClose={onClose}
      body={
        <div className='flex flex-col h-full gap-6'>
          <div className='w-full flex gap-1'>
            {options.map((op, i) => (
              <div
                className={`w-6/12 pb-1 border-b-2 ${
                  i === isActive ? 'border-b-red-500' : ''
                }`}
                key={i}
                onClick={() => setIsActive(i)}
              >
                <p className='text-xl text-center font-semibold'>{op.name}</p>
              </div>
            ))}
          </div>

          <div className='h-full'>
            {isActive === 1 ? (
              <div className='flex gap-6 flex-col'>
                {renderNullCard}
                {userReward.length !== 0 ? (
                  userReward.map(reward => (
                    <CouponSelectedCard reward={reward} key={reward.id} />
                  ))
                ) : (
                  <AnimationEmpty text='Nenhum cupom disponível no momento' />
                )}
              </div>
            ) : (
              <div className='flex gap-6 flex-col'>
                <div className='relative flex w-full'>
                  <input
                    type='text'
                    className='w-full px-2 py-2 rounded-md border-b-2 bg-transparent'
                    placeholder='Pesquisar cupom'
                    onChange={handleInputChange}
                    value={inputValue}
                  />
                  <div onClick={checkCoupon}>
                    <AiOutlineSearch
                      size={30}
                      className='right-2 top-1 absolute cursor-pointer'
                    />
                  </div>
                </div>
                {renderNullCard}

                {renderCouponCards()}
              </div>
            )}
          </div>
        </div>
      }
      title={'Cupons disponíveis'}
      isOpen={rewardCartModal.isOpen}
    />
  );
};

export default RewardCartModal;
