'use client';

import { useTalkToUsModal } from '@/app/hooks/modals/useModal';
import {
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineWhatsApp,
} from 'react-icons/ai';
import { FiClock } from 'react-icons/fi';

import Modal from '../../Modal';
import useGlobalStore from '@/app/hooks/store/useGlobalStore';
import { BsHouseDoor } from 'react-icons/bs';
import SkeletonGeneralData from '../../Skeletons/SkeletonGeneralData';

const TalkToUsModal = () => {
  const talkToUsModal = useTalkToUsModal();
  const { generalData } = useGlobalStore();

  const talkOptions = [
    {
      label: 'Endereço:',
      text: `Rua estrada de ligação, 22. Residencial Sol Nascente`,
      icon: <BsHouseDoor size={30} />,
    },
    {
      label: 'Horario de atendimento:',
      text: `${generalData?.openingHours} - ${generalData?.closingHours}`,
      icon: <FiClock size={30} />,
    },
    {
      label: 'WhatsApp:',
      text: `+55 ${generalData?.cellphone}`,
      icon: <AiOutlineWhatsApp size={30} />,
    },
    {
      label: 'Telefone:',
      text: `${generalData?.telephone}`,
      icon: <AiOutlinePhone size={30} />,
    },
    {
      label: 'Telefone 2:',
      text: `${generalData?.telephone2}`,
      icon: <AiOutlinePhone size={30} />,
    },
    {
      label: 'Email:',
      text: 'saltypoint@gmail.com',
      icon: <AiOutlineMail size={30} />,
    },
  ];

  let body = (
    <div className='flex flex-col gap-6 w-11/12 mx-auto'>
      <div className='flex w-full '>
        <div className='flex flex-col  justify-center items-start gap-6 w-full'>
          {talkOptions.map((option, i) => (
            <div
              className='flex flex-col sm:flex-row gap-2 sm:gap-5 items-start sm:items-center w-full '
              key={i + 1}
            >
              <div className='flex gap-4 items-center'>
                {option.icon}
                <span className='font-light text-lg sm:text-lg text-end'>
                  {option.label}
                </span>
              </div>
              <span className='font-light text-base sm:text-lg underline cursor-pointer'>
                {option.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // if (!generalData) return (body = <SkeletonGeneralData />);
  return (
    <Modal
      onClose={talkToUsModal.onClose}
      body={body}
      isOpen={talkToUsModal.isOpen}
      title='Dados gerais'
    />
  );
};

export default TalkToUsModal;
