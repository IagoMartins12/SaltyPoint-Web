import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonSearchModal = () => {
  return (
    <div className='flex flex-col gap-8 w-11/12 mx-auto'>
      <div className='h-6 w-full px-2 '>
        <Skeleton className='w-full h-full' />
      </div>

      <div className='flex flex-wrap gap-4 w-full px-2'>
        {[1, 2, 3, 4, 5].map((i, key) => (
          <div key={key}>
            <div className={`w-28 h-6`}>
              <Skeleton className='w-full h-full' borderRadius={2} />
            </div>
          </div>
        ))}
      </div>

      <div className='flex flex-col  gap-4  w-full'>
        {[1, 2, 3, 4, 5, 6, 7, 8].map(p => (
          <div
            className='w-full cardBG rounded-2xl flex flex-row-reverse shadow-md px-4 py-2 h-[18vh] cursor-pointer gap-2'
            key={p}
          >
            <div className='w-7/12 flex py-2 h-full flex-col gap-3'>
              <span className='text-base sm:text-lg font-medium'>
                <Skeleton className='w-full h-full' />
              </span>
              <span className='text-sm font-light overflow-hidden '>
                <Skeleton className='w-full h-full' />
              </span>
            </div>
            <div
              className={` w-6/12 sm:w-5/12 h-full relative aspect-ratio rounded-xl`}
            >
              <Skeleton className='h-full w-full items-center' />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonSearchModal;
