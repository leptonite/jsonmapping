import type { JsonMapper } from '../types/JsonMapper';


/**
 * Used in `objectMapper` and `strictObjectMapper` to provide access to the `JsonObject` that must be mapped.
 */
export interface JsonObjectAccessor {

   /**
    * Maps the property with the given `propertyName` using the given `mapper`.
    * If the property doesn't exist or mapping fails, a `JsonMappingError` will be thrown.
    */
   get: <T>(propertyName: string, mapper: JsonMapper<T>) => T;

   /**
    * Maps the property with the given `propertyName` using the given `mapper`.
    * If the property doesn't exist, `defaultValue` (or `undefined`) will be returned.
    * If mapping fails, a `JsonMappingError` will be thrown.
    */
   getOptional: <T, U = undefined>(propertyName: string, mapper: JsonMapper<T>, defaultValue?: U) => T | U;

   /**
    * Explicitly ignores the property with the given `propertyName`.
    * This may be helpful when using `strictObjectMapper`.
    */
   ignore: (propertyName: string) => void;

}
