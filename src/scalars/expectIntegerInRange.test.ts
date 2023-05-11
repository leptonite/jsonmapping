import { expect, test } from '@jest/globals';

import '../toThrowJsonMappingError';
import { expectIntegerInRange } from './expectIntegerInRange';


test.each([
   [0, 0, 0],
   [1, 1, 1],
   [-1, -1, -1],
   [0, 1, 0],
   [0, 1, 1],
   [-10, 5, -10],
   [-10, 5, 0],
   [-10, 5, 5],
])('expectIntegerInRange', (min, max, jsonValue) => {
   const mapper = expectIntegerInRange(min, max);
   expect(mapper(jsonValue)).toBe(jsonValue);
});

test('expectIntegerInRange invalid range', () => {
   expect(() => expectIntegerInRange(1, 0)).toThrow(Error);
});

test('expectIntegerInRange throws', () => {
   expect(() => expectIntegerInRange(0, 0)(null)).toThrowJsonMappingError('integer in range [0..0] expected in jsonValue');
   expect(() => expectIntegerInRange(0, 0)(false)).toThrowJsonMappingError('integer in range [0..0] expected in jsonValue');
   expect(() => expectIntegerInRange(0, 0)(true)).toThrowJsonMappingError('integer in range [0..0] expected in jsonValue');
   expect(() => expectIntegerInRange(0, 0)(3.14)).toThrowJsonMappingError('integer in range [0..0] expected in jsonValue');
   expect(() => expectIntegerInRange(0, 0)('')).toThrowJsonMappingError('integer in range [0..0] expected in jsonValue');
   expect(() => expectIntegerInRange(0, 0)('text')).toThrowJsonMappingError('integer in range [0..0] expected in jsonValue');
   expect(() => expectIntegerInRange(0, 0)([])).toThrowJsonMappingError('integer in range [0..0] expected in jsonValue');
   expect(() => expectIntegerInRange(0, 0)([1, 2, 3])).toThrowJsonMappingError('integer in range [0..0] expected in jsonValue');
   expect(() => expectIntegerInRange(0, 0)({})).toThrowJsonMappingError('integer in range [0..0] expected in jsonValue');
   expect(() => expectIntegerInRange(0, 0)({ a: 1, b: 2 })).toThrowJsonMappingError('integer in range [0..0] expected in jsonValue');
   expect(() => expectIntegerInRange(0, 0)(-1)).toThrowJsonMappingError('integer in range [0..0] expected in jsonValue');
   expect(() => expectIntegerInRange(0, 0)(1)).toThrowJsonMappingError('integer in range [0..0] expected in jsonValue');
   expect(() => expectIntegerInRange(5, 8)(4)).toThrowJsonMappingError('integer in range [5..8] expected in jsonValue');
   expect(() => expectIntegerInRange(5, 8)(9)).toThrowJsonMappingError('integer in range [5..8] expected in jsonValue');
});
