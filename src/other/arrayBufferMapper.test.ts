import { expect, test } from '@jest/globals';

import '../toThrowJsonMappingError';
import { arrayBufferMapper } from './arrayBufferMapper';
import { JsonMappingError } from '../JsonMappingError';


test('arrayBufferMapper', () => {
   const mapper = arrayBufferMapper();
   const actual = mapper('1adf');
   expect(actual instanceof ArrayBuffer).toBe(true);
   expect(actual.byteLength).toBe(2);
   expect(new Uint8Array(actual)[0]).toBe(0x1a);
   expect(new Uint8Array(actual)[1]).toBe(0xdf);
});

test('arrayBufferMapper with custom length check', () => {
   function checkLength(len: number): boolean {
      if (len !== 2) {
         throw new JsonMappingError('exactly 2 bytes expected');
      }
      return true;
   }
   const mapper = arrayBufferMapper(checkLength);
   const actual = mapper('1adf');
   expect(actual instanceof ArrayBuffer).toBe(true);
   expect(actual.byteLength).toBe(2);
   expect(new Uint8Array(actual)[0]).toBe(0x1a);
   expect(new Uint8Array(actual)[1]).toBe(0xdf);
});

test('arrayBufferMapper failes for odd length string', () => {
   const mapper = arrayBufferMapper();
   expect(() => mapper('1ad')).toThrowJsonMappingError('string length must be even in jsonValue');
});

test('arrayBufferMapper failes for invalid byte length', () => {
   const mapper = arrayBufferMapper(len => len === 3);
   expect(() => mapper('1adf')).toThrowJsonMappingError('invalid length in jsonValue');
});

test('arrayBufferMapper failes for invalid byte length with custom error message', () => {
   function checkLength(len: number): boolean {
      if (len !== 3) {
         throw new JsonMappingError('exactly 3 bytes expected');
      }
      return true;
   }
   const mapper = arrayBufferMapper(checkLength);
   expect(() => mapper('1adf')).toThrowJsonMappingError('exactly 3 bytes expected in jsonValue');
});

test('arrayBufferMapper failes non-hex string', () => {
   const mapper = arrayBufferMapper();
   expect(() => mapper('1adg')).toThrowJsonMappingError('hex string expected in jsonValue');
});

