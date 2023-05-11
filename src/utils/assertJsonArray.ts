import { isJsonArray } from './isJsonArray';
import { JsonMappingError } from '../JsonMappingError';
import type { JsonArray, JsonValue } from '../types/JsonValue';


/**
 * Throws a `JsonMappingError` if the given `JsonValue` is not a JsonArray.
 */
export function assertJsonArray(jsonValue: JsonValue): asserts jsonValue is JsonArray {
   if (!isJsonArray(jsonValue)) {
      throw new JsonMappingError('array expected');
   }
}
