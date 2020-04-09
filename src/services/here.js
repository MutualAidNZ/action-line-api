import { create } from 'axios';
import { COMMUNITY_TYPES } from '../models/Community';

const instance = create({
  baseURL:
    process.env.HERE_BASE_URL || 'https://geocode.search.hereapi.com/v1/',
  timeout: 5000,
});

// eslint-disable-next-line import/prefer-default-export
export async function geocode(input) {
  try {
    const geocodeResult = await instance.get(
      `/geocode?q=${input},NZ&apiKey=${process.env.HERE_API_KEY}`
    );

    const { address } = geocodeResult.data.items[0];

    return {
      [COMMUNITY_TYPES.CITY]: address.city,
      [COMMUNITY_TYPES.COUNTRY]: address.countryName,
      [COMMUNITY_TYPES.COUNTY]: address.county,
      [COMMUNITY_TYPES.DISTRICT]: address.district,
      [COMMUNITY_TYPES.POSTAL_CODE]: address.postalCode,
      [COMMUNITY_TYPES.STATE]: address.state,
      [COMMUNITY_TYPES.STREET]: address.street,
    };
  } catch (e) {
    // console.error('Geocode error', e);
    return {};
  }
}
