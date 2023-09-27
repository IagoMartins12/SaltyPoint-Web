interface Location {
  lat: number;
  lng: number;
}

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
