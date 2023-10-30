import { ModalProps } from '@/app/types/ComponentTypes';
import { useCallback, useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';

export const ModalWarning: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  body,
  title,
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
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      {/* Div de fundo para fechar o modal */}
      <div
        className='fixed inset-0 bg-black opacity-50 cursor-pointer'
        onClick={handleClose}
      ></div>
      {/* Modal */}
      <div
        className={`relative w-11/12 sm:w-9/12 lg:w-7/12 xl:w-4/12 h-[60%] sm:h-[55%] my-6 mx-auto`}
      >
        {/* Conteúdo do Modal */}
        <div
          className={`translate duration-300 h-full ${
            showModal ? 'translate-y-0' : 'translate-y-full'
          } ${showModal ? 'opacity-100' : 'opacity-0'}
          }`}
        >
          <div
            className={`translate h-full border-0 rounded-lg shadow-lg relative flex flex-col w-full modalsBackground outline-none self-center focus:outline-none`}
          >
            {/* Cabeçalho */}
            <div className='flex items-center p-6 justify-center'>
              <button
                className='p-1 border-0 hover:opacity-70 transition absolute left-6 flex'
                onClick={handleClose}
              >
                <IoMdClose size={25} />
              </button>
              <div className='text-lg font-semibold'>{title}</div>
            </div>
            {/* Corpo */}
            <div className=' px-6 py-3 flex-auto overflow-auto items-center justify-center flex'>
              {body}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
