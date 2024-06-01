import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonFidelityModal = () => {
  return (
    <>
      {[1, 2, 3, 4, 5, 6, 7].map((i, key) => (
        <div key={key} className='px-4 py-1'>
          <div className='flex py-4 '>
            <div className='w-4/12 sm:w-3/12 h-full flex justify-center items-center'>
              <div className='flex justify-center items-center h-14 w-14 rounded-full bg-gray-200'>
                <Skeleton className='h-full w-full' />
              </div>
            </div>
            <div className='w-8/12 sm:w-9/12  items-center justify-start'>
              <div className={`text-lg font-bold w-64 `}>
                <Skeleton className='h-full w-full' />
              </div>
              <div className={`text-base font-light w-40 `}>
                <Skeleton className='h-full w-full' />
              </div>
            </div>
          </div>
          {key !== 9 ? <hr className='w-11/12 py-1 mx-auto' /> : null}
        </div>
      ))}
    </>
  );
};

export default SkeletonFidelityModal;
