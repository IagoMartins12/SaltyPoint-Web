import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonProfile = () => {
  return (
    <form className='flex flex-col gap-8 w-11/12 mx-auto Z-50'>
      <div className='flex items-center justify-center'>
        <div className='aspect-video w-36 h-36'>
          <Skeleton className='h-full w-full' borderRadius={10000} />
        </div>
      </div>

      {[1, 2, 3, 4].map(i => (
        <div className='flex flex-col gap-2' key={i}>
          <div className='h-4 w-32'>
            <Skeleton className='h-full w-full' />
          </div>

          <div className='h-8 w-full'>
            <Skeleton className='h-full w-full' />
          </div>
        </div>
      ))}

      <div className='px-6 sm:px-0 w-full'>
        <div className={`w-full h-10  items-center justify-center `}>
          <Skeleton className='h-full w-full' />
        </div>
      </div>

      <div className='flex flex-col gap-2'>
        <div className='flex items-center justify-center cursor-pointer'>
          <div className='h-3 w-16'>
            <Skeleton className='h-full w-full' />
          </div>
        </div>

        <div className='flex items-center cursor-pointer justify-center'>
          <div className='h-3 w-40'>
            <Skeleton className='h-full w-full' />
          </div>
        </div>
      </div>
    </form>
  );
};

export default SkeletonProfile;
