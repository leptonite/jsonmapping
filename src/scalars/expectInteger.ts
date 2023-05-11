import type { JsonMapper } from '../types/JsonMapper';
import { JsonMappingError } from '../JsonMappingError';


/**
 * Returns the given `JsonValue` if it is an integer, otherwise throws a `JsonMappingError`.
 */
export const expectInteger: JsonMapper<number> = jsonValue => {
   if (!Number.isInteger(jsonValue)) {
      throw new JsonMappingError('integer expected');
   }
   return jsonValue as number;
};
