import { expect, test } from '@jest/globals';

import '../toThrowJsonMappingError';
import { expectInteger } from './expectInteger';


test.each([
   [0],
   [1],
   [-1],
   [Number.MAX_SAFE_INTEGER + 1],
   [Number.MIN_SAFE_INTEGER - 1],
])('expectInteger', jsonValue => {
   expect(expectInteger(jsonValue)).toBe(jsonValue);
});

test.each([
   [null],
   [false],
   [true],
   [3.14],
   [''],
   ['test'],
   [[]],
   [[1, 2, 3]],
   [{}],
   [{ a: 1, b: 2 }],
])('expectInteger throws', jsonValue => {
   expect(() => expectInteger(jsonValue)).toThrowJsonMappingError('integer expected in jsonValue');
});
