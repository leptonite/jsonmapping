export type JsonValue = null | boolean | number | string | JsonArray | JsonObject;

export type JsonArray = Array<JsonValue>;

export interface JsonObject {
   [key: string]: JsonValue;
}
