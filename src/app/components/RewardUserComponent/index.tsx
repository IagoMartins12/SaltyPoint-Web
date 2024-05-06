import { RewardUserComponentProps } from '@/app/types/ComponentTypes';
import Image from 'next/image';

export const RewardUserComponent: React.FC<RewardUserComponentProps> = ({
  reward,
  onClick,
}) => {
  return (
    <div
      className='flex flex-col w-5/12 h-[55%] cardBG rounded-2xl cursor-pointer'
      onClick={() => {
        if (onClick) {
          onClick(reward);
        }
      }}
    >
      <div className='h-4/5  '>
        <div className='h-5/6 relative p-3 rounded-lg '>
          <Image
            fill
            src={reward.rewardImage}
            sizes='100%'
            alt='rewardImage'
            className='object-fit p-3 rounded-lg'
          />
        </div>

        <div className='h-1/6 flex items-center justify-center'>
          <span className='font-semibold text-sm  text-center'>
            {reward.rewardName}
          </span>
        </div>
      </div>

      <div className='h-1/5 w-full items-center justify-center flex'>
        <span className='font-semibold text-sm text-red-500 text-center'>
          {reward.reward_code}
        </span>
      </div>
    </div>
  );
};
