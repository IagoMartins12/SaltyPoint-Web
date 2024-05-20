import { useEffect, useState } from 'react';
import useGlobalStore from '../store/useGlobalStore';

export const useGeneralDataInfo = () => {
  const [systemOpening, setSystemOpening] = useState<null | boolean>(null);

  const { generalData } = useGlobalStore();

  useEffect(() => {
    const checkOpeningStatus = () => {
      if (!generalData) return;

      if (generalData?.isOpening === null) {
        setSystemOpening(false);
        return;
      }

      const currentHour = new Date().toLocaleTimeString('en-US', {
        hour12: false,
        hour: 'numeric',
        minute: 'numeric',
      });

      const isBetweenOpeningHours =
        currentHour >= generalData.openingHours &&
        currentHour <= generalData.closingHours;

      setSystemOpening(isBetweenOpeningHours);
    };

    checkOpeningStatus();
  }, [generalData]);

  return {
    systemOpening,
  };
};
