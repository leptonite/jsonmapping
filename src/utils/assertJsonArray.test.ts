import { expect, test } from '@jest/globals';

import '../toThrowJsonMappingError';
import { assertJsonArray } from './assertJsonArray';


test.each([
   [[]],
   [[1, 2, 3]],
])('assertJsonArray', jsonValue => {
   expect(assertJsonArray(jsonValue)).toBeUndefined();
});

test.each([
   [null],
   [false],
   [true],
   [0],
   [1],
   [-1],
   [3.14],
   [''],
   ['test'],
   [{}],
   [{ a: 1, b: 2 }],
])('assertJsonArray throws', jsonValue => {
   expect(() => assertJsonArray(jsonValue)).toThrowJsonMappingError('array expected in jsonValue');
});
