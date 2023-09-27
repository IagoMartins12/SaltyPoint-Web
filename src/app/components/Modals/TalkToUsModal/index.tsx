import useTalkToUsModal from '@/app/hooks/modals/useTalkToUs';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import {
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineWhatsApp,
} from 'react-icons/ai';
import Modal from '../Modal';

export const TalkToUsModal = () => {
  const talkToUsModal = useTalkToUsModal();

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async data => {};

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

  const body = (
    <div className='flex flex-col gap-6 w-11/12 mx-auto'>
      <form className='flex flex-col gap-3'>
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

      <span className='text-xl font-medium'>Ou entre em contato:</span>

      <div className='flex w-full '>
        <div className='flex flex-col  justify-center items-start gap-2'>
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
  return (
    <>
      <Modal
        onClose={talkToUsModal.onClose}
        body={body}
        title='Fale conosco'
        isOpen={talkToUsModal.isOpen}
      />
    </>
  );
};
