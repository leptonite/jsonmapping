import { expect, test } from '@jest/globals';

import '../toThrowJsonMappingError';
import { assertJsonObject } from './assertJsonObject';


test.each([
   [{}],
   [{ a: 1, b: 2 }],
])('assertJsonObject', jsonValue => {
   expect(assertJsonObject(jsonValue)).toBeUndefined();
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
   [[]],
   [[1, 2, 3]],
])('assertJsonObject throws', jsonValue => {
   expect(() => assertJsonObject(jsonValue)).toThrowJsonMappingError('object expected in jsonValue');
});
