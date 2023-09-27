import useGeoLocation from '@/app/hooks/customHooks/useGeoLocation';
import useGeoAddressLocation from '@/app/hooks/store/useGeoAddressLocation';
import { getAddressPerGeoLocation } from '@/app/services';
import { GeoLocationProps } from '@/app/types/ComponentTypes';
import { useEffect } from 'react';
import { PuffLoader } from 'react-spinners';

export const GetGeoLocation: React.FC<GeoLocationProps> = ({ setStep }) => {
  const location = useGeoLocation();
  const { setGeoAddress, GeoAddress } = useGeoAddressLocation();
  const apiKey = 'AIzaSyDu0NBwZWMwvPMDy5gTJZ6EDyptHSv2cdg';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAddressPerGeoLocation(
          location.coordinates?.lat,
          location.coordinates?.lng,
          apiKey,
        );
        if (response.ok) {
          const data = await response.json();
          setGeoAddress(data);
        } else {
          console.error('Failed to fetch data:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    if (location.loaded) {
      fetchData();
    }
  }, [location, apiKey]);

  return (
    <>
      <div className='flex flex-col gap-2 h-full'>
        {!location.loaded ? (
          <div className='flex items-center justify-center h-4/6'>
            <PuffLoader />
          </div>
        ) : location.error ? (
          <div className='flex flex-col items-center justify-center gap-8 h-3/6'>
            <span className='text-2xl font-medium text-red-700'>
              Erro ao buscar localização
            </span>
            <button
              onClick={() => {
                setStep(3);
              }}
              className={`flex gap-3 items-center justify-center w-full py-2 rounded-lg bg-red-600 text-white `}
            >
              <span className='font-medium text-lg'>Inserir endereço </span>
            </button>
          </div>
        ) : (
          GeoAddress?.results.map(result => {
            console.log('result:', result);

            return <span>{result.formatted_address}</span>;
          })
        )}
      </div>
    </>
  );
};
