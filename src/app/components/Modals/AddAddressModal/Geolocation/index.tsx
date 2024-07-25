import useGeoLocation from '@/app/hooks/useGeoLocation';
import useGeoAddressLocation from '@/app/hooks/store/useGeoAddressLocation';
import { getAddressPerGeoLocation } from '@/app/services';
import { GeoLocationProps } from '@/app/types/ComponentTypes';
import { useEffect } from 'react';
import { PuffLoader } from 'react-spinners';
import { checkIfAddressIsValid } from '@/app/utils';
import toast from 'react-hot-toast';
import { Result } from '@/app/types/GeolocationType';
import { BsWifiOff } from 'react-icons/bs';

export const GetGeoLocation: React.FC<GeoLocationProps> = ({
  setStep,
  setResult,
}) => {
  const location = useGeoLocation();
  const { setGeoAddress, GeoAddress } = useGeoAddressLocation();
  const apiKey = 'AIzaSyAHf2daxc7jfa2_Z6ShUv_FRyW3vUR2Ja8';

  const requiredTypes = [
    'street_address',
    'route',
    'postal_code',
    'establishment',
    'point_of_interest',
    'premise',
    'sublocality',
  ];

  const getAddressFromResult = (result: Result) => {
    if (result.types.some(type => type === 'postal_code_prefix')) {
      return result.address_components[1].long_name;
    } else if (result.types.some(type => type === 'sublocality')) {
      return result.address_components[0].long_name;
    } else {
      return result.address_components[2].long_name;
    }
  };

  const handleResultClick = (result: Result, isValidAddress: boolean) => {
    if (!isValidAddress) {
      return toast.error('Esse bairro não está na nossa área de entrega.');
    }
    setResult(result);
    setStep(3);
  };

  console.log('GeoAddress', GeoAddress);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, apiKey]);

  return (
    <>
      <div className='flex flex-col gap-2 h-full'>
        {!location.loaded ? (
          <div className='flex items-center justify-center h-4/6'>
            <div className='flex flex-col gap-4 items-center justify-center'>
              <PuffLoader />
              <span className='text-2xl font-medium '>
                Aguardando localização...
              </span>
            </div>
          </div>
        ) : location.error ? (
          <div className='flex flex-col items-center justify-center gap-8 h-3/6'>
            <div className='flex flex-col gap-3 items-center justify-center'>
              <BsWifiOff size={55} />
              <span className='text-2xl font-medium'>
                Erro ao buscar localização
              </span>
            </div>

            <button
              onClick={() => {
                setStep(3);
              }}
              className={`flex gap-3 items-center justify-center w-full py-2 rounded-lg bg-red-500 text-white `}
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
                      const address = getAddressFromResult(result);
                      const isValidAddress = checkIfAddressIsValid(address);

                      return (
                        <div
                          className='flex flex-col border-b-2 gap-2 cursor-pointer'
                          key={i}
                          onClick={() => {
                            handleResultClick(result, isValidAddress);
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
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
