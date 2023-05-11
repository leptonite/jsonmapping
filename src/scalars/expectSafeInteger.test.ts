import { expect, test } from '@jest/globals';

import '../toThrowJsonMappingError';
import { expectSafeInteger } from './expectSafeInteger';


test.each([
   [0],
   [1],
   [-1],
   [Number.MAX_SAFE_INTEGER],
   [Number.MIN_SAFE_INTEGER],
])('expectSafeInteger', jsonValue => {
   expect(expectSafeInteger(jsonValue)).toBe(jsonValue);
});

test.each([
   [null],
   [false],
   [true],
   [3.14],
   [Number.MAX_SAFE_INTEGER + 1],
   [Number.MIN_SAFE_INTEGER - 1],
   [''],
   ['test'],
   [[]],
   [[1, 2, 3]],
   [{}],
   [{ a: 1, b: 2 }],
])('expectSafeInteger throws', jsonValue => {
   expect(() => expectSafeInteger(jsonValue)).toThrowJsonMappingError('safe integer expected in jsonValue');
});
