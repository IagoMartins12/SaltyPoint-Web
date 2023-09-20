import useTalkToUsModal from '@/app/hooks/modals/useTalkToUs';
import Image from 'next/image';
import {
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineWhatsApp,
} from 'react-icons/ai';

export const TalkToUsModal = () => {
  const talkToUsModal = useTalkToUsModal();
  const isOpen = talkToUsModal.isOpen;

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
  return (
    <div
      className={`menuModalsPosition bg-white border-2 flex-col-reverse z-50 ${
        isOpen ? 'flex' : 'hidden'
      }`}
    >
      <div className='flex w-full h-2/6'>
        <div className='flex flex-col w-full justify-center gap-2'>
          {talkOptions.map((op, i) => (
            <div className='flex gap-5 items-start justify-center ' key={i + 1}>
              <div className='flex gap-4 items-center'>
                {op.icon}
                <span className='font-light text-lg text-end'>{op.label}</span>
              </div>
              <span className='font-light text-lg underline cursor-pointer'>
                {op.text}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className='w-full h-3/6 relative'>
        <div className='aspect-video w-full  overflow-hidden rounded-xl m-1'>
          <Image fill className='' src='/talk.svg' alt='talk' />
        </div>
      </div>
    </div>
  );
};
