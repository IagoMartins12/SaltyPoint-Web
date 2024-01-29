import { FC } from 'react';
import { useState } from 'react';
import { IoIosArrowForward, IoIosArrowDown } from 'react-icons/io';

interface AccordionProps {
  label: string;
  text: string;
}

export const AccordeonText: FC<AccordionProps> = ({ label, text }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const iconsSize = 18;

  return (
    <div className='p-3 flex flex-col gap-2 cursor-pointer'>
      <div
        onClick={toggleAccordion}
        className=' space-x-2 flex justify-between items-center py-2'
      >
        <p className='p-base font-semibold'>{label}</p>
        {isOpen ? (
          <IoIosArrowDown size={iconsSize} />
        ) : (
          <IoIosArrowForward size={iconsSize} />
        )}
      </div>
      <div
        className={`overflow-hidden transition-height ${
          isOpen ? 'h-auto' : 'h-0'
        }`}
      >
        <p>{text}</p>
        <hr className='border-b-0 mt-4' />
      </div>
    </div>
  );
};
