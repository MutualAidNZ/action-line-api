import { create } from 'axios';
import { LOCATION_TYPES } from '../models/Location';

const instance = create({
  baseURL:
    process.env.HERE_BASE_URL || 'https://geocode.search.hereapi.com/v1/',
  timeout: 5000,
});

export async function geocode(input) {
  try {
    const geocodeResult = await instance.get(
      `/geocode?q=${input},NZ&apiKey=${process.env.HERE_API_KEY}`
    );

    const { address } = geocodeResult.data.items[0];
    console.log(address);

    return {
      [LOCATION_TYPES.CITY]: address.city,
      [LOCATION_TYPES.COUNTRY]: address.countryName,
      [LOCATION_TYPES.COUNTY]: address.county,
      [LOCATION_TYPES.DISTRICT]: address.district,
      [LOCATION_TYPES.POSTAL_CODE]: address.postalCode,
      [LOCATION_TYPES.STATE]: address.state,
      [LOCATION_TYPES.STREET]: address.street,
    };
  } catch (e) {
    // console.error('Geocode error', e);
    return {};
  }
}
