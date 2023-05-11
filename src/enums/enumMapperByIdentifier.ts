import { enumNumberValueSet } from './enumNumberValueSet';
import type { JsonMapper } from '../types/JsonMapper';
import { JsonMappingError } from '../JsonMappingError';


/**
 * Creates a `JsonMapper` for the given enum to be used if the enum names instead of values are stored.
 */
export function enumMapperByIdentifier<E>(theEnum: Record<string, string | number>): JsonMapper<E> {
   const numberValueSet = enumNumberValueSet(theEnum);

   const map = new Map<string, E>();
   for (const prop in theEnum) {
      if (!numberValueSet.has(prop)) {
         map.set(prop, theEnum[prop] as unknown as E);
      }
   }

   return jsonValue => {
      const value = typeof jsonValue === 'string' ? map.get(jsonValue) : undefined;
      if (value === undefined) {
         throw new JsonMappingError('enum identifier expected');
      }
      return value;
   };
}
