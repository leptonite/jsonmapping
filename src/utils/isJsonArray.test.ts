import { expect, test } from '@jest/globals';

import { isJsonArray } from './isJsonArray';


test('isJsonArray', () => {
   expect(isJsonArray(null)).toBe(false);
   expect(isJsonArray(false)).toBe(false);
   expect(isJsonArray(true)).toBe(false);
   expect(isJsonArray(0)).toBe(false);
   expect(isJsonArray(1)).toBe(false);
   expect(isJsonArray(3.14)).toBe(false);
   expect(isJsonArray('')).toBe(false);
   expect(isJsonArray('text')).toBe(false);
   expect(isJsonArray([])).toBe(true);
   expect(isJsonArray([1, 2, 3])).toBe(true);
   expect(isJsonArray({})).toBe(false);
   expect(isJsonArray({ a: 1, b: 2 })).toBe(false);
});
