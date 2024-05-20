import { Reward } from '@/app/types/ModelsType';
import { FC } from 'react';
import { LuPizza } from 'react-icons/lu';
import { MdLocalDrink, MdOutlineDiscount } from 'react-icons/md';
import { GiFullPizza } from 'react-icons/gi';

interface RewardInfoProps {
  reward: Reward;
}

export const RewardInfo: FC<RewardInfoProps> = ({ reward }) => {
  const iconSize = 30;

  const color = '#000000';

  const checkIcon = () => {
    if (reward.name.toUpperCase().includes('CUPOM')) {
      return <MdOutlineDiscount size={iconSize} color={color} />;
    } else if (reward.name.toUpperCase().includes('PIZZA')) {
      return <GiFullPizza size={iconSize} color={color} />;
    } else if (reward.name.toUpperCase().includes('BROTINHO')) {
      return <LuPizza size={iconSize} color={color} />;
    } else {
      return <MdLocalDrink size={iconSize} color={color} />;
    }
  };
  return (
    <div className='flex py-4 '>
      <div className='w-4/12 sm:w-3/12 h-full flex justify-center items-center'>
        <div className='flex justify-center items-center h-14 w-14 rounded-full bg-gray-200'>
          {checkIcon()}
        </div>
      </div>
      <div className='w-8/12 sm:w-9/12  items-center justify-start'>
        <p className={`text-lg font-bold `}>{reward.name}</p>
        <p className={`text-base font-light `}>
          Resgate com {reward.quantity_points} pontos
        </p>
      </div>
    </div>
  );
};
