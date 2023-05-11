import { expectOneOf } from '../scalars/expectOneOf';
import type { JsonMapper } from '../types/JsonMapper';
import { objectMapper } from './objectMapper';


/**
 * Creates a `JsonMapper` that
 * * expects its given `JsonValue` to be an object,
 * * expects this object to have a property which name equals the `typeProp` argument,
 * * expects this property to have a string value,
 * * uses this string as key to select a mapper in the given `mappers` argument,
 * * maps the `JsonValue` using the selected mapper.
 */
export function delegatingMapper<T>(typeProp: string, mappers: Record<string, JsonMapper<T>>): JsonMapper<T> {
   const typeFromJSON = expectOneOf(...Object.keys(mappers));
   const mapperFromJSON = objectMapper(accessor => accessor.get(typeProp, jsonValue => mappers[typeFromJSON(jsonValue)]!));
   return jsonValue => mapperFromJSON(jsonValue)(jsonValue);
}
