import type { JsonMapper } from '../types/JsonMapper';
import { JsonMappingError } from '../JsonMappingError';


/**
 * Returns the given `JsonValue` if it is a safe integer, otherwise throws a `JsonMappingError`.
 */
export const expectSafeInteger: JsonMapper<number> = jsonValue => {
   if (!Number.isSafeInteger(jsonValue)) {
      throw new JsonMappingError('safe integer expected');
   }
   return jsonValue as number;
};
