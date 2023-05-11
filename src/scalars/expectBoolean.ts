import type { JsonMapper } from '../types/JsonMapper';
import { JsonMappingError } from '../JsonMappingError';


/**
 * Returns the given `JsonValue` if it is a boolean, otherwise throws a `JsonMappingError`.
 */
export const expectBoolean: JsonMapper<boolean> = jsonValue => {
   if (typeof jsonValue !== 'boolean') {
      throw new JsonMappingError('boolean expected');
   }
   return jsonValue;
};
