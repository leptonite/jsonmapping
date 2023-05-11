import type { JsonMapper } from '../types/JsonMapper';
import { JsonMappingError } from '../JsonMappingError';


/**
 * Creates a `JsonMapper` that returns the given `JsonValue` if it is an integer within [min..max] and otherwise throws a `JsonMappingError`.
 */
export function expectIntegerInRange(min: number, max: number): JsonMapper<number> {
   if (min > max) {
      throw new Error('invalid range');
   }
   return jsonValue => {
      if (!Number.isInteger(jsonValue)) {
         throw new JsonMappingError(`integer in range [${min}..${max}] expected`);
      }
      const int = jsonValue as number;
      if (int < min || int > max) {
         throw new JsonMappingError(`integer in range [${min}..${max}] expected`);
      }
      return int;
   };
}
