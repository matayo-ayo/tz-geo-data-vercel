declare module "tz-geo-data" {
  export function getAllRegions(): Array<{ region: string; postcode: string }>;
  export function getDistrictData(
    region: string
  ): Array<{ name: string; postcode: string }>;
  export function getWardData(
    district: string
  ): Array<{ ward: string; postcode: string }>;
  export function getStreetsData(
    ward: string
  ): Array<{ street: string; postcode: string }>;
  export function getGeoData(postcode: string): {
    region: string;
    district: string;
    ward: string;
    street: string;
    places: string[];
  };
}
