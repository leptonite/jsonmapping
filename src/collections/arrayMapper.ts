import { assertJsonArray } from '../utils/assertJsonArray';
import type { JsonMapper } from '../types/JsonMapper';
import { mapProperty } from '../mapProperty';


/**
 * Creates a `JsonMapper` for arrays that maps each element with the given `JsonMapper`.
 */
export function arrayMapper<T>(elementMapper: JsonMapper<T>): JsonMapper<Array<T>> {
   return jsonValue => {
      assertJsonArray(jsonValue);
      return jsonValue.map((value, index) => mapProperty(index, value, elementMapper));
   };
}
