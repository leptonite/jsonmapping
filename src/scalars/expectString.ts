import type { JsonMapper } from '../types/JsonMapper';
import { JsonMappingError } from '../JsonMappingError';


/**
 * Returns the given `JsonValue` if it is a string, otherwise throws a `JsonMappingError`.
 */
export const expectString: JsonMapper<string> = jsonValue => {
   if (typeof jsonValue !== 'string') {
      throw new JsonMappingError('string expected');
   }
   return jsonValue;
};
