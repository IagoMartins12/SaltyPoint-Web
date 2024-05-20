import { LabelInfo } from '@/app/types/ComponentTypes';

export const OrderInfo: React.FC<LabelInfo> = ({ content, label }) => {
  return (
    <div className='flex flex-col gap-2 pb-2 border-b-2'>
      <span className='text-sm font-light'>{label}</span>
      <span className='text-base font-normal'> {content} </span>
    </div>
  );
};
