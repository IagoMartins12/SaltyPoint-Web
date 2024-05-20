import { GeoLocationStore } from '@/app/types/ComponentTypes';
import { create } from 'zustand';

const useGeoAddressLocation = create<GeoLocationStore>(set => ({
  GeoAddress: null,
  setGeoAddress: GeoAddress => set({ GeoAddress: GeoAddress }),
}));

export default useGeoAddressLocation;
