import type { JsonValue } from './JsonValue';


/**
 * A `JsonMapper` is a function that takes a `JsonValue` and validates it and/or converts it into something else.
 */
export type JsonMapper<T> = (jsonValue: JsonValue) => T;
