import { expect, test } from '@jest/globals';

import '../toThrowJsonMappingError';
import { expectString } from './expectString';


test.each([
   [''],
   ['test'],
])('expectString', jsonValue => {
   expect(expectString(jsonValue)).toBe(jsonValue);
});

test.each([
   [null],
   [false],
   [true],
   [0],
   [1],
   [-1],
   [3.14],
   [[]],
   [[1, 2, 3]],
   [{}],
   [{ a: 1, b: 2 }],
])('expectString throws', jsonValue => {
   expect(() => expectString(jsonValue)).toThrowJsonMappingError('string expected in jsonValue');
});
