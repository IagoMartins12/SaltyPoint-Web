import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonCategory = () => {
  return (
    <div className='w-11/12 mx-auto my-3 py-2 flex flex-row items-center hiddenScroll overflow-x-auto gap-3 relative -z-20'>
      {[1, 2, 3, 4, 5].map(i => (
        <div key={i}>
          <div className={`w-28 h-6`}>
            <Skeleton className='w-full h-full' borderRadius={2} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonCategory;
