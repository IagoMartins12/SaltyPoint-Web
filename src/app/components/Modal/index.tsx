import { useCallback, useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';

interface ModalProps {
  isOpen?: any;
  onClose: any;
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
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      {/* Div de fundo para fechar o modal */}
      <div
        className='fixed inset-0 bg-black opacity-50'
        onClick={handleClose}
      />
      {/* Modal */}
      <div
        className={`relative ${authModal ? 'w-8/12' : 'w-4/12'} ${
          authModal ? 'lg:h-[65%]' : 'lg:h-[85%]'
        } my-6 mx-auto`}
      >
        {/* Conteúdo do Modal */}
        <div
          className={`translate duration-300 h-full ${
            showModal ? 'translate-y-0' : 'translate-y-full'
          } ${showModal ? 'opacity-100' : 'opacity-0'}`}
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
            <div className=' overflow-auto privacyScroll h-full'>
              <div className='relative p-6 flex-auto h-full'> {body}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
