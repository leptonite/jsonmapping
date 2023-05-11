import type { JsonMapper } from './types/JsonMapper';
import { JsonMappingError } from './JsonMappingError';
import type { JsonValue } from './types/JsonValue';


export function mapProperty<T>(propertyName: number | string, propertyValue: JsonValue, mapper: JsonMapper<T>): T {
   try {
      return mapper(propertyValue);
   } catch (e) {
      throw new JsonMappingError(e, propertyName);
   }
}
