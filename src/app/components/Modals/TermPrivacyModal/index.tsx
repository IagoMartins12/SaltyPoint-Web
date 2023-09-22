import usePrivacyTerms from '@/app/hooks/modals/usePrivacyTerms';
import { useTheme } from 'next-themes';
import { IoCloseOutline } from 'react-icons/io5';

export const TermPrivacyModal = () => {
  const { theme } = useTheme();
  const termPrivacyModal = usePrivacyTerms();

  return (
    <div
      className={`menuModalsPosition rounded-md gap-6 ${
        theme === 'light' ? 'bg-white' : 'bg-black'
      }  flex-col z-50 ${termPrivacyModal.isOpen ? 'flex' : 'hidden'}`}
    >
      <div className='flex items-center justify-between ml-5 mt-2'>
        <IoCloseOutline
          size={30}
          onClick={() => termPrivacyModal.onClose()}
          style={{ cursor: 'pointer' }}
        />
      </div>

      <span className='text-3xl font-semibold w-10/12 mx-auto'>
        Fale conosco
      </span>
    </div>
  );
};
