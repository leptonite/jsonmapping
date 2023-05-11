import { assertJsonObject } from '../utils/assertJsonObject';
import type { JsonMapper } from '../types/JsonMapper';
import { mapProperty } from '../mapProperty';


/**
 * Maps a `JsonObject` by mapping each property with the given `valueMapper`.
 */
export function mapObjectMapper<T>(valueMapper: JsonMapper<T>): JsonMapper<Record<string, T>> {
   return jsonValue => {
      assertJsonObject(jsonValue);
      const mapObject: Record<string, T> = {};
      for (const [key, value] of Object.entries(jsonValue)) {
         mapObject[key] = mapProperty(key, value, valueMapper);
      }
      return mapObject;
   };
}
