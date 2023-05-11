import { isJsonObject } from './isJsonObject';
import { JsonMappingError } from '../JsonMappingError';
import type { JsonObject, JsonValue } from '../types/JsonValue';


/**
 * Throws a `JsonMappingError` if the given `JsonValue` is not a `JsonObject`.
 */
export function assertJsonObject(jsonValue: JsonValue): asserts jsonValue is JsonObject {
   if (!isJsonObject(jsonValue)) {
      throw new JsonMappingError('object expected');
   }
}
