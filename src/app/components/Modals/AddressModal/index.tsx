'use client';

import { BsFillHouseDoorFill } from 'react-icons/bs';
import { FaSuitcase } from 'react-icons/fa';
import { AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai';
import usePrivateStore from '@/app/hooks/store/usePrivateStore';
import { useDeleteAddress } from '@/app/hooks/modals/useDelete';
import Modal from '../../Modal';
import { useAddAddress, useAddress } from '@/app/hooks/modals/useModal';
import toast from 'react-hot-toast';
import { AnimationEmpty } from '../../Animations/AnimationEmpty';

const AddressModal = () => {
  const { address } = usePrivateStore();
  const addressModal = useAddress();
  const addAddress = useAddAddress();
  const deleteAddressModal = useDeleteAddress();

  const isValid = () => {
    const addressLenght = address.filter(
      address => address.isActive === 0,
    ).length;

    if (addressLenght <= 4) return true;

    return false;
  };

  const body = (
    <div className='w-full overflow-auto privacyScroll h-full'>
      <div className='flex flex-col w-11/12 mx-auto h-full gap-12 '>
        <div className='flex flex-col gap-4 justify-end w-full '>
          {address.length > 0 ? (
            address
              .filter(address => address.isActive === 0)
              .map((address, i) => (
                <div
                  className='flex items-center px-2 py-3 border-b-2 gap-3'
                  key={i}
                >
                  <div className='w-2/12 flex items-center justify-center'>
                    {address.type_adress === 0 ? (
                      <BsFillHouseDoorFill size={30} />
                    ) : (
                      <FaSuitcase size={30} />
                    )}
                  </div>

                  <div className='w-8/12 flex flex-col'>
                    <span className='font-medium text-lg'>
                      {address.type_adress === 0 ? 'Casa' : 'Trabalho'}
                    </span>
                    <span className='text-sm font-light'>
                      {address.address}, {address.number}
                    </span>
                    <span className='text-sm font-light'>
                      {address.district}
                    </span>
                    <span className='text-sm font-light'>
                      {address.city} / {address.uf}
                    </span>

                    {address.reference && (
                      <span className='text-sm font-light'>
                        {address.reference}
                      </span>
                    )}
                  </div>

                  <div className='w-2/12 flex items-end gap-2 justify-center'>
                    <AiOutlineDelete
                      size={25}
                      className='cursor-pointer'
                      onClick={() => {
                        deleteAddressModal.setCurrentItem(address.id);
                        deleteAddressModal.onOpen();
                      }}
                      color='red'
                    />
                  </div>
                </div>
              ))
          ) : (
            <div className='w-full h-full'>
              <AnimationEmpty text='Sem endereço cadastrado' />
            </div>
          )}

          <div
            className='flex items-center justify-center gap-3 my-3 cursor-pointer'
            onClick={() => {
              isValid()
                ? addAddress.onOpen()
                : toast.error('Quantidade maxima de endereços atingida!');
            }}
          >
            <AiOutlinePlus size={25} color='red' fill='red' />
            <span className='font-semibold text-lg text-red-500 hover:text-red-700'>
              Adicionar endereço
            </span>
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <>
      <Modal
        onClose={addressModal.onClose}
        body={body}
        isOpen={addressModal.isOpen}
        title='Meus endereços'
      />
    </>
  );
};

export default AddressModal;
