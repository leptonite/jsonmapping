import { enumNumberValueSet } from './enumNumberValueSet';
import type { JsonMapper } from '../types/JsonMapper';
import { JsonMappingError } from '../JsonMappingError';


/**
 * Creates a `JsonMapper` for the given enum.
 */
export function enumMapperByValue<E>(theEnum: Record<string, string | number>): JsonMapper<E> {
   const numberValues = enumNumberValueSet(theEnum);

   const stringValues = new Set<string>();
   for (const prop in theEnum) {
      const value = theEnum[prop];
      if (typeof value === 'string' && !numberValues.has(prop)) {
         stringValues.add(value);
      }
   }

   return jsonValue => {
      if (typeof jsonValue === 'number' && numberValues.has(jsonValue.toString()) || typeof jsonValue === 'string' && stringValues.has(jsonValue)) {
         return jsonValue as unknown as E;
      }
      throw new JsonMappingError('enum value expected');
   };
}
