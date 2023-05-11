import { isJsonObject } from '../utils/isJsonObject';
import type { JsonMapper } from '../types/JsonMapper';
import type { JsonObject, JsonValue } from '../types/JsonValue';
import { JsonMappingError } from '../JsonMappingError';
import type { JsonObjectAccessor } from './JsonObjectAccessor';
import { mapProperty } from '../mapProperty';


export class ObjectMappingHelper implements JsonObjectAccessor {

   protected readonly jsonObject: JsonObject;

   public constructor(jsonValue: JsonValue) {
      if (!isJsonObject(jsonValue)) {
         throw new JsonMappingError('object expected');
      }
      this.jsonObject = jsonValue;
   }

   public get<T>(propertyName: string, mapper: JsonMapper<T>): T {
      const jsonValue = this.jsonObject[propertyName];
      if (jsonValue === undefined) {
         throw new JsonMappingError(`missing property ${JSON.stringify(propertyName)}`);
      }
      return mapProperty(propertyName, jsonValue, mapper);
   }

   public getOptional<T>(propertyName: string, mapper: JsonMapper<T>): T | undefined;
   public getOptional<T>(propertyName: string, mapper: JsonMapper<T>, defaultValue: T): T;
   public getOptional<T>(propertyName: string, mapper: JsonMapper<T>, defaultValue?: T): T | undefined {
      const jsonValue = this.jsonObject[propertyName];
      return jsonValue === undefined ? defaultValue : mapProperty(propertyName, jsonValue, mapper);
   }

   public ignore(_propertyName: string): void {
      // This method doesn't do anything.
      // It only exists because objectMapper and strictObjectMapper should have the same signature.
   }

}

/**
 * Creates a `JsonMapper` that uses the given `factory` to map a `JsonObject` to some value.
 * If the `JsonValue` to be mapped is not a `JsonObject`, a `JsonMappingError` will be thrown.
 * The factory doesn't access the `JsonObject` directly.
 * Instead an `accessor` gets passed that must be used to access and map the `JsonObject`'s properties.
 */
export function objectMapper<T>(factory: (accessor: JsonObjectAccessor) => T): JsonMapper<T> {
   return jsonValue => factory(new ObjectMappingHelper(jsonValue));
}
