import usePrivacyTerms from '@/app/hooks/modals/usePrivacyTerms';
import { IoCloseOutline } from 'react-icons/io5';

export const TermPrivacyModal = () => {
  const termPrivacyModal = usePrivacyTerms();

  return (
    <div
      className={`menuModalsPosition rounded-md gap-3 modalsBackground  flex-col z-50 flex ${
        termPrivacyModal.isOpen ? 'modal-open' : 'modal-closed'
      }`}
    >
      <div className='flex items-center justify-between ml-5 mt-2'>
        <IoCloseOutline
          size={30}
          onClick={() => termPrivacyModal.onClose()}
          style={{ cursor: 'pointer' }}
        />
      </div>
      {/* Politica de privacidade */}
      <div className='overflow-auto privacyScroll'>
        <div className='flex flex-col gap-6 mx-auto w-10/12'>
          <div className='flex flex-col w-full gap-6'>
            <span className='text-2xl font-semibold'>
              Politica de Privacidade
            </span>
            <span className='font-light text-xm'>
              Somos um serviço online e, consequentemente, coletamos e recebemos
              informações dos usuários que trafegam por nossas páginas e
              utilizam nosso software.
            </span>
            <span className='font-light text-xm'>
              Todas estas informações são mantidas em absoluto sigilo e não são
              compartilhadas, cedidas ou vendidas a outras organizações para
              fins comerciais, exceto se tivermos sua permissão ou nas condições
              detalhadas a seguir:
            </span>
            <li>
              Por determinação judicial ou em caso de investigação de fraudes ou
              suspeita de atitudes ilegais ou que estejam em desacordo com
              nossos termos de uso.
            </li>
          </div>

          {/* Coleta de informações */}
          <div className='flex flex-col w-full gap-6'>
            <span className='text-2xl font-semibold'>
              Coleta de informações
            </span>
            <span className='font-light text-xm'>
              As informações que são coletadas estão relacionadas a seus dados
              cadastrais e servem para identificá-lo como contratante/usuário de
              nossos produtos.
            </span>
            <span className='font-light text-xm'>
              Além disso, utilizamos os dados fornecidos para a melhoria da
              prestação de nossos serviços e qualidade nossos produtos, contato
              e identificação dos clientes, quando necessária.
            </span>
          </div>

          {/* Informações pessoais coletadas pela Salty Point */}
          <div className='flex flex-col w-full gap-6'>
            <span className='text-2xl font-semibold'>
              Informações pessoais coletadas pela Salty Point
            </span>
            <span className='font-light text-xm'>
              São coletados os dados de identificação como nome, endereço de
              correio eletrônico e informações agregadas ao pedido de delivery
              padrão (como endereço, referência e observações) que são
              informações fornecidas voluntariamente pelo usuário a título de
              viabilizar o serviço de delivery e/ou retirada em loja.
            </span>
          </div>

          {/* O que o Usuário pode fazer */}
          <div className='flex flex-col w-full gap-6'>
            <span className='text-2xl font-semibold'>
              O que o Usuário pode fazer
            </span>
            <span className='font-light text-xm'>
              O usuário tem direito de acessar, modificar, corrigir e eliminar
              os dados fornecidos por eles mesmos. Se o usuário atualizar
              qualquer informação, a Salty Point poderá manter uma cópia das
              informações anteriores fornecidas por ele em nossos arquivos e
              documentações sobre uso do sistema.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
