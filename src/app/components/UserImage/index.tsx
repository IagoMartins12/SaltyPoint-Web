'use client';

import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { useCallback } from 'react';
import { FcPlus } from 'react-icons/fc';

const uploadPreset = 'evuh89yc';

interface ProfileImageProps {
  onChange: (value: string) => void;
  value: string;
}

const ProfileImage: React.FC<ProfileImageProps> = ({ onChange, value }) => {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange],
  );

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset={uploadPreset}
      options={{
        maxFiles: 1,
        sources: ['local'],
        fieldName: 'Selecionar',
        defaultSource: 'local',
        language: 'pt-BR',
      }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className='aspect-video w-36 h-36 relative flex cursor-pointer'
          >
            <Image
              fill
              className='object-cover rounded-full w-full '
              src={value}
              sizes='100%'
              alt='Post'
            />
            <FcPlus size={28} className='absolute bottom-1 right-3' />
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ProfileImage;
