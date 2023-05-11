import { JsonMappingError } from '../JsonMappingError';
import type { JsonValue } from '../types/JsonValue';


/**
 * Expects the given `JsonValue` to be a string containing an ISO formatted date and time
 * (e. g. `2017-12-31T23:59:59.999Z`) and converts it to a `Date` object.
 *
 * @deprecated since 0.7, use `dateFromJSON` instead
 */
export function toDate(jsonValue: JsonValue): Date {
   if (typeof jsonValue !== 'string' || !/^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\.[0-9]{3}Z$/u.test(jsonValue)) {
      throw new JsonMappingError('combined date and time in ISO 8601 format expected');
   }
   return new Date(jsonValue);
}
