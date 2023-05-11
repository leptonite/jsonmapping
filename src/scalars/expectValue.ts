import type { JsonMapper } from '../types/JsonMapper';
import { JsonMappingError } from '../JsonMappingError';


/**
 * Creates a `JsonMapper` that expects (and returns) the given `value` or throws a `JsonMappingError`.
 */
export function expectValue<T extends boolean | number | string | null>(value: T): JsonMapper<T> {
   return jsonValue => {
      if (jsonValue !== value) {
         throw new JsonMappingError(JSON.stringify(value) + ' expected');
      }
      return value;
   };
}
