import { expect, test } from '@jest/globals';

import { isJsonObject } from './isJsonObject';


test('isJsonArray', () => {
   expect(isJsonObject(null)).toBe(false);
   expect(isJsonObject(false)).toBe(false);
   expect(isJsonObject(true)).toBe(false);
   expect(isJsonObject(0)).toBe(false);
   expect(isJsonObject(1)).toBe(false);
   expect(isJsonObject(3.14)).toBe(false);
   expect(isJsonObject('')).toBe(false);
   expect(isJsonObject('text')).toBe(false);
   expect(isJsonObject([])).toBe(false);
   expect(isJsonObject([1, 2, 3])).toBe(false);
   expect(isJsonObject({})).toBe(true);
   expect(isJsonObject({ a: 1, b: 2 })).toBe(true);
});
