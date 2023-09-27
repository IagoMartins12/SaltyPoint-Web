'use client';

import useGeoLocation from '@/app/hooks/customHooks/useGeoLocation';
import useGeoAddressLocation from '@/app/hooks/store/useGeoAddressLocation';
import { getAddressPerGeoLocation } from '@/app/services';
import { useEffect } from 'react';

export const GetGeoLocation = () => {
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
    <div>
      <div className='flex flex-col gap-2'>
        {GeoAddress?.results.map(result => {
          console.log('result:', result);

          return <span>{result.formatted_address}</span>;
        })}
      </div>
    </div>
  );
};
