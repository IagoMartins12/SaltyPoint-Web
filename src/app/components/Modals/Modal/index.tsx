'use client';

import { useCallback, useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  title?: string;
  body?: React.ReactElement;
  authModal?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  body,
  authModal,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div
        className='
          justify-center 
          items-center 
          flex 
          fixed 
          inset-0 
          z-50 
          outline-none 
          focus:outline-none
        '
      >
        <div
          className={` relative  w-full md:w-4/6 lg:w-3/6 ${
            authModal ? 'xl:w-[60%]' : 'xl:w-[30%]'
          } my-6 mx-auto  h-full `}
        >
          {/*content*/}
          <div
            className={`
            flex
            translate
            duration-300
            h-full
            ${showModal ? 'translate-y-0' : 'translate-y-full'}
            ${showModal ? 'opacity-100' : 'opacity-0'}
          `}
          >
            <div
              className={`
              translate
              h-full
              ${authModal ? 'lg:h-[65%]' : 'lg:h-4/5'}
              border-0 
              rounded-lg
              shadow-lg 
              relative 
              flex 
              flex-col 
              w-full 
              modalsBackground
              outline-none 
              self-center
              focus:outline-none`}
            >
              {/*header*/}
              <div
                className='
                flex 
                items-center 
                p-6
                rounded-t
                justify-center
                relative
                border-b-[1px]
                '
              >
                <button
                  className='
                    p-1
                    border-0 
                    hover:opacity-70
                    transition
                    absolute
                    left-9
                  '
                  onClick={handleClose}
                >
                  <IoMdClose size={18} />
                </button>
                <div className='text-lg font-semibold'>{title}</div>
              </div>
              {/*body*/}
              <div className='relative p-6 flex-auto overflow-auto privacyScroll'>
                {body}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
