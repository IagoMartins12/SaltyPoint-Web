import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonGeneralData = () => {
  return (
    <div className='flex flex-col gap-6 w-11/12 mx-auto'>
      <div className='flex w-full '>
        <div className='flex flex-col  justify-center items-start gap-6 w-full'>
          {[1, 2, 3, 4, 5, 6, 7].map((option, i) => (
            <div
              className='flex flex-col sm:flex-row gap-2 sm:gap-5 items-start sm:items-center w-full h-8 '
              key={option + 1}
            >
              <div className='gap-4 flex flex-row'>
                <div className='w-14 '>
                  <Skeleton className='h-full w-full' />
                </div>

                <div className='w-28'>
                  <Skeleton className='h-full w-full' />
                </div>
              </div>
              <div className='w-full'>
                <Skeleton className='h-full w-full' />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkeletonGeneralData;
