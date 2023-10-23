import { RewardComponentProps } from '@/app/types/ComponentTypes';
import Image from 'next/image';

export const RewardComponent: React.FC<RewardComponentProps> = ({ reward }) => {
  console.log('reward', reward);
  return (
    <div className='flex flex-col w-5/12 h-[25vh] shadow-md'>
      <div className='h-4/5 relative '>
        <div className='h-4/5 relative p-3 '>
          <Image
            fill
            src={reward.image}
            sizes='100%'
            alt='rewardImage'
            className='object-fit p-3'
          />
        </div>

        <div className='h-1/5'>
          <span className='font-semibold text-sm text-red-500 text-center'>
            {reward.name}
          </span>
        </div>
      </div>

      <div className='h-1/5 w-full items-center justify-center flex'>
        <span className='font-semibold text-sm text-red-500 text-center'>
          {reward.quantity_points} Pontos
        </span>
      </div>
    </div>
  );
};
