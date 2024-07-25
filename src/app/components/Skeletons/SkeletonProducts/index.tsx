import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonProducts = () => {
  return (
    <div className='w-11/12 mx-auto sm:pt-4 flex flex-col gap-8 -z-20'>
      {[1, 2, 3, 4, 5].map(i => (
        <div className='flex flex-col w-full gap-6  -z-20' key={i}>
          <span className={`px-3 ${i % 2 === 1 ? 'w-64 md:w-80' : 'w-44'}`}>
            <Skeleton className='h-full w-full' />
          </span>
          <div className='flex gap-x-2 gap-y-6 flex-wrap  -z-20'>
            {[6, 7, 8, 9, 10, 11, 12, 13, 14].map(index => (
              <div
                key={index}
                className={`flex cardBG h-[26vh] sm:h-[23vh] p-2 shadow-md rounded-2xl w-full md:w-[48%] xl:w-[32%] `}
              >
                <div className={` w-6/12 sm:w-5/12 h-full rounded-xl`}>
                  <Skeleton className='h-full w-full items-center' />
                </div>
                <div className='flex flex-col w-6/12 sm:w-7/12 h-full gap-4 py-2 px-5 justify-between overflow-hidden'>
                  <div className='flex flex-col gap-4 h-4/5 overflow-hidden'>
                    <span className='font-semibold text-lg h-4'>
                      <Skeleton className='h-full w-full' />
                    </span>
                    <span className='font-light text-sm h-12 '>
                      <Skeleton className='h-full w-full' />
                    </span>
                  </div>
                  <span className='font-bold text-lg w-32'>
                    <Skeleton className='h-full w-full' />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonProducts;
