import type { JsonObject, JsonValue } from '../types/JsonValue';


/**
 * Checks if the given `JsonValue` is a `JsonObject`
 *
 * @returns true if `jsonValue` is a `JsonObject`, false otherwise
 */
export function isJsonObject(jsonValue: JsonValue): jsonValue is JsonObject {
   return jsonValue !== null && typeof jsonValue === 'object' && !Array.isArray(jsonValue);
}
