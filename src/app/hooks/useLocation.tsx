'use client';

import { getAddressPerGeoLocation } from '@/app/services';
import { useEffect } from 'react';
import useGeoLocation from './customHooks/useGeoLocation';
import useGeoAddressLocation from './store/useGeoAddressLocation';

export const GeoLocation = () => {
  const { setGeoAddress } = useGeoAddressLocation();
  const location = useGeoLocation();
  const apiKey = 'AIzaSyDu0NBwZWMwvPMDy5gTJZ6EDyptHSv2cdg';

  useEffect(() => {
    const fetchData = async () => {
      if (location.coordinates?.lat && location.coordinates?.lng) {
        try {
          const response = await getAddressPerGeoLocation(
            location.coordinates.lat,
            location.coordinates.lng,
            apiKey,
          );
          setGeoAddress(response);
        } catch (error) {
          console.log(error);
        }
      }
    };

    if (location.loaded) {
      fetchData();
    }
  }, [location, apiKey]);

  return (
    <>
      <div className='separator'>Hook 3: User Geo Location Hook</div>
      <div className='row d-flex justify-content-center mt-3 mb-5 pb-5'>
        <div className='col-6'>
          <div className='card'>
            <div className='card-header text-left font-weight-bold d-flex'>
              <div className='inline-block mr-auto pt-1'>
                {location.loaded
                  ? JSON.stringify(location)
                  : 'Location data not available yet.'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
