import { expect, test } from '@jest/globals';

import '../toThrowJsonMappingError';
import { expectValue } from './expectValue';


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
])('expectValue', jsonValue => {
   const mapper = expectValue(jsonValue);
   expect(mapper(jsonValue)).toBe(jsonValue);
});

test('expectValue throws', () => {
   expect(() => expectValue(null)(false)).toThrowJsonMappingError('null expected in jsonValue');
   expect(() => expectValue(null)(0)).toThrowJsonMappingError('null expected in jsonValue');
   expect(() => expectValue(null)('')).toThrowJsonMappingError('null expected in jsonValue');
   expect(() => expectValue(null)([])).toThrowJsonMappingError('null expected in jsonValue');
   expect(() => expectValue(null)({})).toThrowJsonMappingError('null expected in jsonValue');

   expect(() => expectValue(false)(null)).toThrowJsonMappingError('false expected in jsonValue');
   expect(() => expectValue(false)(0)).toThrowJsonMappingError('false expected in jsonValue');
   expect(() => expectValue(false)('')).toThrowJsonMappingError('false expected in jsonValue');
   expect(() => expectValue(false)([])).toThrowJsonMappingError('false expected in jsonValue');
   expect(() => expectValue(false)({})).toThrowJsonMappingError('false expected in jsonValue');

   expect(() => expectValue(0)(null)).toThrowJsonMappingError('0 expected in jsonValue');
   expect(() => expectValue(0)(false)).toThrowJsonMappingError('0 expected in jsonValue');
   expect(() => expectValue(0)('')).toThrowJsonMappingError('0 expected in jsonValue');
   expect(() => expectValue(0)([])).toThrowJsonMappingError('0 expected in jsonValue');
   expect(() => expectValue(0)({})).toThrowJsonMappingError('0 expected in jsonValue');

   expect(() => expectValue('')(null)).toThrowJsonMappingError('"" expected in jsonValue');
   expect(() => expectValue('')(false)).toThrowJsonMappingError('"" expected in jsonValue');
   expect(() => expectValue('')(0)).toThrowJsonMappingError('"" expected in jsonValue');
   expect(() => expectValue('')([])).toThrowJsonMappingError('"" expected in jsonValue');
   expect(() => expectValue('')({})).toThrowJsonMappingError('"" expected in jsonValue');
});
