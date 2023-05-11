import type { JsonMapper } from '../types/JsonMapper';
import { JsonMappingError } from '../JsonMappingError';


/**
 * Creates a `JsonMapper` that expects (and returns) one of the given `values` or throws a `JsonMappingError`.
 */
export function expectOneOf<T extends boolean | number | string | null>(...values: Array<T>): JsonMapper<T> {
   const valueSet = new Set(values);
   return jsonValue => {
      if (!valueSet.has(jsonValue as T)) {
         throw new JsonMappingError(`one of ${values.map(v => JSON.stringify(v)).join(', ')} expected`);
      }
      return jsonValue as T;
   };
}
