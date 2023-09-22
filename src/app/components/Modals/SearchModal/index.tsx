import useSearchModal from '@/app/hooks/modals/useSearchModal';
import { useTheme } from 'next-themes';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import {
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineSearch,
  AiOutlineWhatsApp,
} from 'react-icons/ai';
import { IoCloseOutline } from 'react-icons/io5';

export const SearchModal = () => {
  const searchModal = useSearchModal();
  const { theme } = useTheme();

  const { register, handleSubmit } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    console.log(data);
  };

  const talkOptions = [
    {
      label: 'WhatsApp:',
      text: '+55 (11) 98859-8530',
      icon: <AiOutlineWhatsApp size={30} />,
    },
    {
      label: 'Telefone:',
      text: '+55 (11) 3943-3038',
      icon: <AiOutlinePhone size={30} />,
    },
    {
      label: 'Email:',
      text: 'saltypoint@gmail.com',
      icon: <AiOutlineMail size={30} />,
    },
  ];

  const emailOptions = [
    {
      id: 'name',
      label: 'Nome',
      type: 'text',
    },
    {
      id: 'email',
      label: 'Email',
      type: 'email',
    },
    {
      id: 'message',
      label: 'Mensagem',
      type: 'textarea',
    },
  ];
  return (
    <div
      className={`menuModalsPosition rounded-md gap-6 ${
        theme === 'light' ? 'bg-white' : 'bg-black'
      }  flex-col z-50 ${searchModal.isOpen ? 'flex' : 'hidden'}`}
    >
      <div className='flex items-center justify-between ml-5 mt-2'>
        <IoCloseOutline
          size={30}
          onClick={() => searchModal.onClose()}
          style={{ cursor: 'pointer' }}
        />
      </div>
      <div className='relative flex w-10/12 mx-auto'>
        <input type='text' className='w-full px-2 py-2' />
        <AiOutlineSearch
          size={30}
          className='right-2 top-1 absolute cursor-pointer'
        />
      </div>
    </div>
  );
};
