import Location, { LOCATION_TYPES } from '../../models/Location';
import Task from '../../models/Task';
import { geocode } from '../../services/here';

/**
 * Create task controller
 *
 * @export
 * @param {*} req
 * @param {*} res
 * @returns
 */
export default async function createTaskController(req, res) {
  const { requester, body, title } = req.body;

  const geocodeResult = await geocode(requester.postcode);
  console.log(geocodeResult);
  const locationIds = [];

  try {
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(geocodeResult)) {
      if (value) {
        let location = await Location.findOne({ type: key, name: value });
        if (!location) {
          let parent;

          // switch (key) {
          //   case LOCATION_TYPES.POSTAL_CODE:
          //     parent =
          //       geocodeResult[LOCATION_TYPES.STREET] ||
          //       geocodeResult[LOCATION_TYPES.DISTRICT] ||
          //       geocodeResult[LOCATION_TYPES.CITY];
          //     break;
          //   case LOCATION_TYPES.STREET:
          //     parent =
          //       geocodeResult[LOCATION_TYPES.DISTRICT] ||
          //       geocodeResult[LOCATION_TYPES.CITY];
          //     break;
          //   case LOCATION_TYPES.DISTRICT:
          //     parent = geocodeResult[LOCATION_TYPES.CITY];
          //     break;
          //   case LOCATION_TYPES.CITY:
          //     parent = geocodeResult[LOCATION_TYPES.COUNTY];
          //     break;
          //   case LOCATION_TYPES.COUNTY:
          //     parent = geocodeResult[LOCATION_TYPES.STATE];
          //     break;
          //   case LOCATION_TYPES.STATE:
          //     parent = geocodeResult[LOCATION_TYPES.COUNTRY];
          //     break;
          //   case LOCATION_TYPES.COUNTRY:
          //     parent = null;
          //     break;
          // }

          location = await Location.create({ type: key, name: value, parent });
        }

        // eslint-disable-next-line no-underscore-dangle
        locationIds.push(location._id);
      }
    }

    const task = await Task.create({
      requester,
      title,
      body,
      location: locationIds,
    });

    return res.send(task);
  } catch (e) {
    console.error(e);
    return res.status(500).send({ code: 'FAILED', error: e.message });
  }
}
