import { FaCrown } from 'react-icons/fa';

export const ProgressBar = ({ points }: { points: number }) => {
  const maxWidth = 620;
  const maxPoints = window.innerWidth < maxWidth ? 250 : 500;
  const step = 50;
  const numBalls = Math.ceil(maxPoints / step);

  const balls = Array.from({ length: numBalls }, (_, index) => {
    return (
      <div
        key={index}
        className={`flex flex-col items-center gap-r justify-between mx-1 ${
          points >= (index + 1) * step && points >= step
            ? 'opacity-100'
            : 'opacity-30'
        }`}
      >
        <div
          className={`w-8 sm:w-12  h-8 sm:h-12 bg-red-500 rounded-full flex items-center justify-center`}
        >
          <FaCrown />
        </div>
        <span className='text-xs'>{(index + 1) * step}</span>
      </div>
    );
  });

  let currentStep = 0;
  for (let i = 0; i < numBalls; i++) {
    const nextStep = (i + 1) * step;
    if (points <= nextStep) {
      currentStep = i;
      break;
    }
  }

  const percentage = (points - currentStep * step) / step;
  const barWidth = (currentStep + percentage) * (90 / numBalls);

  return (
    <div className='flex flex-col items-center justify-center w-full relative overflow-hidden pt-4 -z-10'>
      <div className='absolute -z-20 w-full h-2 bg-transparent'>
        <div
          className='absolute h-full bg-red-500'
          style={{ width: `${barWidth}%` }}
        ></div>
      </div>
      <div className='flex -z-10 mt-2 w-full justify-evenly gap-2 sm:gap-0'>
        {balls}
      </div>
    </div>
  );
};
