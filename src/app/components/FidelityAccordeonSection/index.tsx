import React, { useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';

import {
  FrequentDoubts,
  RegulamentTexts,
  RegulamentTextsRewards,
  RegulamentTextsRules,
} from './data';
import { AccordeonText } from '../AccordeonText';
import {
  useFidelityModal,
  useTalkToUsModal,
} from '@/app/hooks/modals/useModal';

const FidelityAccordeonSection = () => {
  const [frequentDoubtsOpen, setFrequentDoubtsOpen] = useState(false);
  const [regulamentOpen, setRegulamentOpen] = useState(false);

  const talkToUs = useTalkToUsModal();
  const fidelityModal = useFidelityModal();

  const iconsSize = 18;

  const openTalkToUs = () => {
    fidelityModal.onClose();
    talkToUs.onOpen();
  };

  return (
    <div className='flex flex-col shadow-md rounded-lg px-4 py-4'>
      <div className='py-4'>
        <p className='font-extralight text-lg'>Mais informações</p>
      </div>

      <div>
        <div
          className='flex justify-between items-center py-4 px-1 cursor-pointer'
          onClick={() => setFrequentDoubtsOpen(!frequentDoubtsOpen)}
        >
          <p className='text-xl font-medium'>Dúvidas frequentes</p>
          {frequentDoubtsOpen ? (
            <FaMinus size={iconsSize} />
          ) : (
            <FaPlus size={iconsSize} />
          )}
        </div>
        <div
          className={`overflow-hidden ${
            frequentDoubtsOpen ? 'flex flex-col ' : 'hidden '
          }`}
        >
          {FrequentDoubts.map((item, key) => (
            <AccordeonText label={item.label} text={item.text} key={key} />
          ))}
        </div>
      </div>
      <div>
        <div
          className='flex justify-between items-center py-4 px-1 cursor-pointer'
          onClick={() => setRegulamentOpen(!regulamentOpen)}
        >
          <p className='text-xl font-medium'>Regulamento</p>
          {regulamentOpen ? (
            <FaMinus size={iconsSize} />
          ) : (
            <FaPlus size={iconsSize} />
          )}
        </div>
        <div
          className={`${regulamentOpen ? 'flex flex-col gap-6' : 'hidden'} `}
        >
          <div className='flex flex-col gap-4'>
            <p className='font-semibold text-lg'>1. Elegibilidade</p>
            <ol className='list-disc w-[90%] mx-auto flex flex-col gap-4'>
              {RegulamentTexts.map((item, key) => (
                <li key={key}>{item.text}</li>
              ))}
            </ol>
          </div>

          <div className='flex flex-col gap-4'>
            <p className='font-semibold text-lg'>2. Regras e premiação</p>
            <ol className='list-disc w-[90%] mx-auto flex flex-col gap-4'>
              {RegulamentTextsRules.map((item, key) => (
                <li key={key}>{item.text}</li>
              ))}
            </ol>
          </div>

          <div className='flex flex-col gap-4'>
            <p className='font-semibold text-lg'>3. Resgate de prêmios</p>
            <ol className='list-disc w-[90%] mx-auto flex flex-col gap-4'>
              {RegulamentTextsRewards.map((item, key) => (
                <li key={key}>{item.text}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-4 py-4 '>
        <p className='text-lg font-medium'>Ainda precisa de ajuda?</p>
        <p
          className='font-light text-lg underline cursor-pointer'
          onClick={openTalkToUs}
        >
          Entre em contato com a gente!
        </p>
      </div>
    </div>
  );
};

export default FidelityAccordeonSection;
