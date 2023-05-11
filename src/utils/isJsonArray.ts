import type { JsonArray, JsonValue } from '../types/JsonValue';


/**
 * Checks if the given `JsonValue` is a `JsonArray`
 *
 * @returns true if `jsonValue` is a `JsonArray`, false otherwise
 */
export function isJsonArray(jsonValue: JsonValue): jsonValue is JsonArray {
   return Array.isArray(jsonValue);
}
