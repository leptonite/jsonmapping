import type { JsonMapper } from '../types/JsonMapper';
import { JsonMappingError } from '../JsonMappingError';
import type { JsonObjectAccessor } from './JsonObjectAccessor';
import type { JsonValue } from '../types/JsonValue';
import { ObjectMappingHelper } from './objectMapper';


class StrictObjectMappingHelper extends ObjectMappingHelper {

   private readonly expectedProperties = new Set<string>();

   public constructor(jsonValue: JsonValue) {
      super(jsonValue);
   }

   public override get<T>(propertyName: string, mapper: JsonMapper<T>): T {
      this.expectedProperties.add(propertyName);
      return super.get(propertyName, mapper);
   }

   public override getOptional<T>(propertyName: string, mapper: JsonMapper<T>): T | undefined;
   public override getOptional<T>(propertyName: string, mapper: JsonMapper<T>, defaultValue: T): T;
   public override getOptional<T>(propertyName: string, mapper: JsonMapper<T>, defaultValue?: T): T | undefined {
      this.expectedProperties.add(propertyName);
      return super.getOptional(propertyName, mapper, defaultValue);
   }

   public override ignore(propertyName: string): void {
      this.expectedProperties.add(propertyName);
   }

   public failOnUnexpectedProperties(): void {
      for (const propertyName in this.jsonObject) {
         if (!this.expectedProperties.has(propertyName)) {
            throw new JsonMappingError(`unexpected property ${JSON.stringify(propertyName)}`);
         }
      }
   }

}

/**
 * Creates a `JsonMapper` that uses the given `factory` to map a `JsonObject` to some value.
 * If the `JsonValue` to be mapped is not a `JsonObject`, a `JsonMappingError` will be thrown.
 * The factory doesn't access the `JsonObject` directly.
 * Instead an `accessor` gets passed that must be used to access and map the `JsonObject`'s properties.
 * There is only a singe difference between `objectMapper` and `strictObjectMapper`:
 * `strictObjectMapper` throws a `JsonMappingError` if the `JsonObject` to be mapped has a property
 * that is not accessed by the given `factory`.
 */
export function strictObjectMapper<T>(factory: (accessor: JsonObjectAccessor) => T): JsonMapper<T> {
   return jsonValue => {
      const accessor = new StrictObjectMappingHelper(jsonValue);
      const result = factory(accessor);
      accessor.failOnUnexpectedProperties();
      return result;
   };
}
