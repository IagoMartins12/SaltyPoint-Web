'use client';

import { useFidelityModal, useLoginModal } from '@/app/hooks/modals/useModal';
import Modal from '../../Modal';
import { RewardInfo } from '../../RewardInfo';
import FidelityAccordeonSection from '../../FidelityAccordeonSection';
import usePrivateStore from '@/app/hooks/store/usePrivateStore';
import { useEffect, useState } from 'react';
import { Reward } from '@/app/types/ModelsType';
import { getRewards } from '@/app/services';

const FidelityModal = () => {
  const [rewards, setRewards] = useState<[] | Reward[]>([]);

  const fidelityModal = useFidelityModal();
  const loginModal = useLoginModal();
  const { user } = usePrivateStore();
  const openLogin = () => {
    fidelityModal.onClose();
    loginModal.onOpen();
  };

  const fetchReward = async () => {
    const response = await getRewards();
    if (response) {
      // Ordenar o array com base na propriedade 'quantity_points'
      const sortedRewards = response.sort(
        (a, b) => a.quantity_points - b.quantity_points,
      );
      // Pegar os 10 primeiros itens
      const slicedRewards = sortedRewards.slice(0, 10);
      setRewards(slicedRewards);
    }
  };

  useEffect(() => {
    fetchReward();
  }, []);

  const body = (
    <div className='flex flex-col h-full w-full gap-8 pb-8'>
      <div className='flex flex-col gap-6 w-full h-52 items-center justify-center shadow-md rounded-lg px-4 py-4'>
        <p className='font-semibold text-xl text-center'>
          Programa de fidelidade
        </p>

        <p className='font-light text-center'>
          Ganhe 1 ponto a cada R$ 1,00, e troque por recompensas incríveis.
        </p>

        {!user ? (
          <div className='px-4 py-3  w-8/12 mx-auto buttonBG rounded-xl'>
            <p
              className='text-center text-white font-semibold cursor-pointer'
              onClick={openLogin}
            >
              ENTRE E PARTICIPE
            </p>
          </div>
        ) : (
          <p className='text-center font-semibold cursor-pointer '>
            Você possui {user.points} pontos
          </p>
        )}
      </div>

      <div>
        <p className='text-2xl font-medium text-center '>
          Benefícios que você pode ganhar
        </p>
      </div>

      <div className='shadow-md rounded-lg'>
        {rewards.map((i, key) => (
          <div key={key} className='px-4 py-1'>
            <RewardInfo reward={i} />
            {key !== 9 ? <hr className='w-11/12 py-1 mx-auto' /> : null}
          </div>
        ))}
      </div>

      <p className='text-center w-full '>*Prêmio não acumulativo</p>

      {/* Substituir 'FidelityAccordeonSection' por um componente equivalente */}
      <FidelityAccordeonSection />
    </div>
  );

  return (
    <>
      <Modal
        onClose={fidelityModal.onClose}
        body={body}
        isOpen={fidelityModal.isOpen}
        title='Plano de fidelidade'
      />
    </>
  );
};

export default FidelityModal;
