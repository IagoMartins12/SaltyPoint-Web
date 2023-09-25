import useTalkToUsModal from '@/app/hooks/modals/useTalkToUs';
import { useTheme } from 'next-themes';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import {
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineWhatsApp,
} from 'react-icons/ai';
import { IoCloseOutline } from 'react-icons/io5';

export const TalkToUsModal = () => {
  const talkToUsModal = useTalkToUsModal();
  const { theme } = useTheme();

  const { register, handleSubmit, reset } = useForm<FieldValues>({
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
      className={`menuModalsPosition rounded-md gap-6  ${
        theme === 'light' ? 'bg-white' : 'bg-black'
      }  flex-col z-50 flex ${
        talkToUsModal.isOpen ? 'modal-open' : 'modal-closed'
      }`}
    >
      <div className='flex items-center justify-between ml-5 mt-2'>
        <IoCloseOutline
          size={30}
          onClick={() => talkToUsModal.onClose()}
          style={{ cursor: 'pointer' }}
        />
      </div>

      <span className='text-3xl font-semibold w-10/12 mx-auto'>
        Fale conosco
      </span>

      <form className='flex flex-col w-10/12 mx-auto gap-3'>
        {emailOptions.map((option, i) => (
          <div className='flex flex-col gap-2' key={i}>
            <span>{option.label}</span>
            {option.type !== 'textarea' ? (
              <input
                type={option.type}
                className='border-b-2 px-2 py-2 bg-transparent'
                {...register(option.id, { required: true })}
              />
            ) : (
              <textarea
                rows={3}
                className=' p-2 bg-transparent resize-none border-b-2'
                id={option.id}
                {...register(option.id, { required: true })}
              />
            )}
          </div>
        ))}
        <button
          className='mx-auto w-full px-1 py-3 rounded-md text-white bg-red-900 my-4 '
          onClick={handleSubmit(onSubmit)}
        >
          <span className='font-semibold text-medium'>Enviar</span>
        </button>
      </form>

      <span className='text-xl font-medium w-10/12 mx-auto'>
        Ou entre em contato:
      </span>

      <div className='flex w-full '>
        <div className='flex flex-col  justify-center items-start w-10/12 mx-auto gap-2'>
          {talkOptions.map((option, i) => (
            <div className='flex gap-5 items-start justify-center ' key={i + 1}>
              <div className='flex gap-4 items-center'>
                {option.icon}
                <span className='font-light text-lg text-end'>
                  {option.label}
                </span>
              </div>
              <span className='font-light text-lg underline cursor-pointer'>
                {option.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
