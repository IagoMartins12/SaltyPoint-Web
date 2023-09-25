import { IoCloseOutline } from 'react-icons/io5';
import useAddress from '@/app/hooks/modals/useAddress';
import { BsFillHouseDoorFill } from 'react-icons/bs';
import { FaSuitcase } from 'react-icons/fa';
import { AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai';
import { VscEdit } from 'react-icons/vsc';
import useAddAddress from '@/app/hooks/modals/useAddAddress';
import usePrivateStore from '@/app/hooks/store/usePrivateStore';
import useDelete from '@/app/hooks/modals/useDelete';

export const AddressModal = () => {
  const { address } = usePrivateStore();
  const addressModal = useAddress();
  const addAddress = useAddAddress();
  const deleteAddressModal = useDelete();

  return (
    <div
      className={`menuModalsPosition rounded-md gap-6 modalsBackground flex-col z-50 flex ${
        addressModal.isOpen ? 'modal-open' : 'modal-closed'
      }`}
    >
      <div className='flex items-center justify-between ml-5 mt-2'>
        <IoCloseOutline
          size={30}
          onClick={() => addressModal.onClose()}
          style={{ cursor: 'pointer' }}
        />
      </div>

      {/* <BsFillHouseDoorFill /> */}
      <div className='flex flex-col w-10/12 mx-auto gap-12'>
        <div className='flex flex-col gap-4'>
          <span className='font-semibold text-xl'>Meus endereços </span>
          {address.length > 0 ? (
            address.map((address, i) => (
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
                  <span className='text-sm font-light'>{address.district}</span>
                  <span className='text-sm font-light'>
                    {address.city} / {address.uf}
                  </span>
                </div>

                <div className='w-2/12 flex items-end gap-2 justify-center'>
                  <VscEdit size={25} />
                  <AiOutlineDelete
                    size={25}
                    className='cursor-pointer'
                    onClick={() => {
                      deleteAddressModal.setCurrentItem(address.id);
                      deleteAddressModal.onOpen();
                    }}
                  />
                </div>
              </div>
            ))
          ) : (
            <div className='h-60 flex items-center justify-center'>
              <span className='font-semibold text-xl text-center'>
                Sem endereço cadastrado!
              </span>
            </div>
          )}

          <div
            className='flex items-center justify-center gap-3 my-3 cursor-pointer'
            onClick={() => {
              addAddress.onOpen();
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
};
