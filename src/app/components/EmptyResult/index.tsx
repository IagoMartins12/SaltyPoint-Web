export const EmptyResult = ({ text }: { text: string }) => {
  return (
    <div className='h-40 flex items-center justify-center'>
      <span className='font-semibold text-xl text-center'>{text}</span>
    </div>
  );
};
