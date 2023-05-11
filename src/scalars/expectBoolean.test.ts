import { expect, test } from '@jest/globals';

import '../toThrowJsonMappingError';
import { expectBoolean } from './expectBoolean';


test.each([
   [false],
   [true],
])('expectBoolean', jsonValue => {
   expect(expectBoolean(jsonValue)).toBe(jsonValue);
});

test.each([
   [null],
   [0],
   [1],
   [-1],
   [3.14],
   [''],
   ['test'],
   [[]],
   [[1, 2, 3]],
   [{}],
   [{ a: 1, b: 2 }],
])('expectBoolean throws', jsonValue => {
   expect(() => expectBoolean(jsonValue)).toThrowJsonMappingError('boolean expected in jsonValue');
});
