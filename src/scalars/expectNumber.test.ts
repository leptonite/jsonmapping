import { expect, test } from '@jest/globals';

import '../toThrowJsonMappingError';
import { expectNumber } from './expectNumber';


test.each([
   [0],
   [1],
   [-1],
   [3.14],
])('expectNumber', jsonValue => {
   expect(expectNumber(jsonValue)).toBe(jsonValue);
});

test.each([
   [null],
   [false],
   [true],
   [''],
   ['test'],
   [[]],
   [[1, 2, 3]],
   [{}],
   [{ a: 1, b: 2 }],
])('expectNumber throws', jsonValue => {
   expect(() => expectNumber(jsonValue)).toThrowJsonMappingError('number expected in jsonValue');
});
