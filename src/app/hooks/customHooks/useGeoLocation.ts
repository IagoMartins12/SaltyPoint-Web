import React, { useState, useEffect } from 'react';

type Coordinates = {
  lat: number;
  lng: number;
};

type Location = {
  loaded: boolean;
  coordinates?: Coordinates;
  error?: GeolocationPositionError;
};

const useGeoLocation = (): Location => {
  const [location, setLocation] = useState<Location>({
    loaded: false,
  });

  const onSuccess = (position: GeolocationPosition) => {
    setLocation({
      loaded: true,
      coordinates: {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      },
    });
  };

  const onError = (error: GeolocationPositionError) => {
    setLocation({
      loaded: true,
      error: error,
    });
  };

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      onError({
        code: 0,
        message: 'Geolocation not supported',
        PERMISSION_DENIED: 1,
        POSITION_UNAVAILABLE: 2,
        TIMEOUT: 3,
      });
    } else {
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
  }, []);

  return location;
};

export default useGeoLocation;
