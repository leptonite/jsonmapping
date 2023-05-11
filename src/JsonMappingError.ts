/**
 * A subclass of `Error` that indicates an error that occured when mapping a JsonValue.
 * `JsonMappingError` provides the exact path in the object tree where an error occured (`propertyPath`)
 * and details about the error (`propertyError`).
 */
export class JsonMappingError extends Error {

   public readonly propertyError: string;
   public readonly propertyPath: ReadonlyArray<string | number>;

   public constructor(message: string);
   public constructor(chainedError: unknown, property: number | string);
   public constructor(
      messageOrChainedError: unknown,
      property?: number | string,
   ) {
      let myPropertyError: string;
      let myPropertyPath: ReadonlyArray<string | number>;
      if (typeof messageOrChainedError === 'string' && property === undefined) {
         myPropertyError = messageOrChainedError;
         myPropertyPath = [];
      } else if (messageOrChainedError instanceof JsonMappingError) {
         myPropertyError = messageOrChainedError.propertyError;
         myPropertyPath = [property!, ...messageOrChainedError.propertyPath];
      } else {
         myPropertyError = `${messageOrChainedError}`;
         myPropertyPath = [property!];
      }
      super(createErrorMessage(myPropertyError, myPropertyPath));
      Object.setPrototypeOf(this, JsonMappingError.prototype);
      this.name = 'JsonMappingError';
      this.propertyError = myPropertyError;
      this.propertyPath = myPropertyPath;
   }

   public override toString(jsonValueName?: string): string {
      return jsonValueName === undefined ? super.toString() : `${this.name}: ${createErrorMessage(this.propertyError, this.propertyPath, jsonValueName)}`;
   }

}

/**
 * Throws a `JsonMappingError` with the given `message`.
 */
export function jsonMappingError(message: string): never {
   throw new JsonMappingError(message);
}

function propertyAccessor(property: number | string): string {
   if (typeof property === 'number') {
      return '[' + property.toString() + ']';
   }
   if (/^[a-zA-Z_][a-zA-Z0-9_]*$/u.test(property)) {
      return '.' + property;
   }
   return '[' + JSON.stringify(property) + ']';
}

function createErrorMessage(propertyError: string, propertyPath: ReadonlyArray<string | number>, jsonValueName = 'jsonValue'): string {
   const pathString = propertyPath.reduce<string>((s, property) => s + propertyAccessor(property), '');
   return `${propertyError} in ${jsonValueName}${pathString}`;
}
