import type { JsonMapper } from '../types/JsonMapper';
import { JsonMappingError } from '../JsonMappingError';


/**
 * Returns the given `JsonValue` if it is a number, otherwise throws a `JsonMappingError`.
 */
export const expectNumber: JsonMapper<number> = jsonValue => {
   if (typeof jsonValue !== 'number') {
      throw new JsonMappingError('number expected');
   }
   return jsonValue;
};
