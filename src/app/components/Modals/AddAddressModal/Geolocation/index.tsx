import useGeoLocation from '@/app/hooks/useGeoLocation';
import useGeoAddressLocation from '@/app/hooks/store/useGeoAddressLocation';
import { getAddressPerGeoLocation } from '@/app/services';
import { GeoLocationProps } from '@/app/types/ComponentTypes';
import { useEffect } from 'react';
import { PuffLoader } from 'react-spinners';
import { checkIfAddressIsValid } from '@/app/utils';
import toast from 'react-hot-toast';

export const GetGeoLocation: React.FC<GeoLocationProps> = ({
  setStep,
  setResult,
}) => {
  const location = useGeoLocation();
  const { setGeoAddress, GeoAddress } = useGeoAddressLocation();
  const apiKey = 'AIzaSyDu0NBwZWMwvPMDy5gTJZ6EDyptHSv2cdg';

  console.log(location);

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

  const requiredTypes = [
    'street_address',
    'route',
    'postal_code',
    'establishment',
    'point_of_interest',
    'premise',
    'sublocality',
  ];

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
          <div className='flex flex-col gap-4'>
            <span className='text-xl font-medium'>
              Selecione um dos resultados abaixo
            </span>
            <div className='flex flex-col gap-6 overflow-auto'>
              {GeoAddress?.results ? (
                <>
                  {GeoAddress.results
                    .filter(result =>
                      result.types.some(type => requiredTypes.includes(type)),
                    )
                    .map((result, i) => {
                      return (
                        <div
                          className='flex flex-col border-b-2 gap-2 cursor-pointer'
                          key={i}
                          onClick={() => {
                            const check = checkIfAddressIsValid(
                              result.address_components[1].long_name,
                            );

                            if (!check) {
                              return toast.error(
                                'Esse endereço não está na nossa área de entrega',
                              );
                            }
                            setResult(result);
                            setStep(3);
                          }}
                        >
                          <span>{result.formatted_address}</span>
                        </div>
                      );
                    })}
                  <button
                    onClick={() => {
                      setStep(3);
                    }}
                    className={`flex gap-3 items-center justify-center w-full py-2 rounded-lg bg-red-600 text-white `}
                  >
                    <span className='font-medium text-lg'>
                      Não achei meu endereço
                    </span>
                  </button>
                </>
              ) : (
                <div>
                  <PuffLoader />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
