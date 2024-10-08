import { ImageComponentType } from '@/app/types/ComponentTypes';
import Image from 'next/image';

export const ImageComponent: React.FC<ImageComponentType> = ({ alt, src }) => {
  return (
    <Image
      fill
      className='sm:object-cover -z-10'
      src={`/${src}`}
      alt={alt}
      sizes='100%'
    />
  );
};
