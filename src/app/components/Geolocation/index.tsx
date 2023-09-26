'use client';

import useGeoLocation from '@/app/hooks/useGeoLocation';
import { getAddressPerGeoLocation } from '@/app/services';
import { useEffect, useState } from 'react';

export const GetGeoLocation = () => {
  const location = useGeoLocation();
  const [addressData, setAddressData] = useState(null);

  const apiKey = 'AIzaSyDu0NBwZWMwvPMDy5gTJZ6EDyptHSv2cdg';
  const key = process.env.MAPS_KEY;

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
          setAddressData(data);
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

  return {
    location,
    addressData,
  };
};
