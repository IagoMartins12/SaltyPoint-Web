import { AddressRadioButton } from '@/app/types/ComponentTypes';

export const AddressRadio: React.FC<AddressRadioButton> = ({
  icon: Icon,
  text,
  index,
  name,
  onChange,
}) => {
  const handleRadioChange = () => {
    onChange(index, name); // Chame a função onChange com o índice e o nome
  };

  return (
    <>
      <div className='flex items-center px-2 py-3 gap-3'>
        <div className=' flex items-center justify-center'>
          <Icon size={25} />
        </div>

        <div className=' flex flex-col'>
          <span className='font-medium text-lg'> {text} </span>
        </div>

        <div className='flex items-end justify-center'>
          <input
            type='radio'
            id={text}
            name={name} // Use o nome fornecido
            onChange={handleRadioChange}
            required // Manipule a mudança de seleção
          />
        </div>
      </div>
    </>
  );
};
