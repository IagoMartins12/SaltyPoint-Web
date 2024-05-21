import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonLogin = () => {
  return (
    <div className='flex flex-col-reverse sm:flex-row justify-around h-full'>
      <div className='flex flex-col w-full sm:w-7/12 lg:w-5/12 p-2'>
        <div className='w-11/12 mx-auto sm:mx-0 sm:w-auto'>
          <div className='w-40'>
            <Skeleton className='h-full w-full' />
          </div>
          <div className='flex flex-col py-4'>
            <div className='w-40'>
              <Skeleton className='h-full w-full' />
            </div>
            <div className='w-72'>
              <Skeleton className='h-full w-full' />
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-y-5 m-auto w-11/12  '>
          {[1, 2].map(index => (
            <div key={index} className='h-12'>
              <Skeleton className='h-full w-full' />
            </div>
          ))}
          <div className='flex justify-end my-3'>
            <div className='text-base w-36'>
              <Skeleton className='h-full w-full' />
            </div>
          </div>
          <div className='flex flex-col w-full gap-y-4'>
            <div className='px-6 sm:px-0 w-full'>
              <div className={`w-full h-10  items-center justify-center `}>
                <Skeleton className='h-full w-full' />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='w-full sm:w-5/12 lg:w-4/12 relative'>
        <div className='aspect-video w-full h-64 sm:h-4/5 mt-4 sm:mt-10 relative overflow-hidden rounded-xl m-1'>
          <Skeleton className='h-full w-full items-center' />
        </div>
      </div>
    </div>
  );
};

export default SkeletonLogin;
