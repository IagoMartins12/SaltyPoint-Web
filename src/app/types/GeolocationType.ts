type Coordinates = {
  lat: number;
  lng: number;
};

export type Location = {
  loaded: boolean;
  coordinates?: Coordinates;
  error?: GeolocationPositionError;
};

interface NortheastSouthwest {
  northeast: Location;
  southwest: Location;
}

interface Geometry {
  location: Location;
  location_type: string;
  viewport: NortheastSouthwest;
}

interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

interface PlusCode {
  compound_code: string;
  global_code: string;
}

export interface Result {
  address_components: AddressComponent[];
  formatted_address: string;
  geometry: Geometry;
  place_id: string;
  plus_code?: PlusCode;
  types: string[];
}

export interface GoogleMapsApiResponse {
  plus_code?: PlusCode;
  results: Result[];
  status: string;
}
