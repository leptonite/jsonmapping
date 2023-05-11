import { expectString } from '../scalars/expectString';
import type { JsonMapper } from '../types/JsonMapper';
import { JsonMappingError } from '../JsonMappingError';


/**
 * Creates a `JsonMapper` that expects a string in hex format and converts it to an `ArrayBuffer` or throws a `JsonMappingError`.
 *
 * @param checkLength Function that checks `ArrayBuffer`'s length. To indicate an error, `checkLength` returns a falsy value or throws a `JsonMappingError`.
 */
export function arrayBufferMapper(checkLength?: (byteLength: number) => boolean): JsonMapper<ArrayBuffer> {
   return jsonValue => {
      const jsonString = expectString(jsonValue);
      if (jsonString.length % 2 !== 0) {
         throw new JsonMappingError('string length must be even');
      }
      const byteLength = jsonString.length / 2;
      if (checkLength && !checkLength(byteLength)) {
         throw new JsonMappingError('invalid length');
      }
      if (!/^[0-9a-fA-F]*$/u.test(jsonString)) {
         throw new JsonMappingError('hex string expected');
      }
      const arrayBuffer = new ArrayBuffer(byteLength);
      const view = new Uint8Array(arrayBuffer);
      for (let i = 0; i < byteLength; i++) {
         view[i] = parseInt(jsonString.substring(2 * i, 2 * i + 2), 16);
      }
      return arrayBuffer;
   };
}
