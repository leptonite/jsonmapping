import { expect, test } from '@jest/globals';

import '../toThrowJsonMappingError';
import { expectOneOf } from './expectOneOf';


test.each([
   [[null], null],
   [[false], false],
   [[true], true],
   [[0], 0],
   [[1], 1],
   [[-1], -1],
   [[3.14], 3.14],
   [[''], ''],
   [['test'], 'test'],
   [[true, 1, 'a'], true],
   [[true, 1, 'a'], 1],
   [[true, 1, 'a'], 'a'],
])('expectOneOf', (expectedValues, jsonValue) => {
   const mapper = expectOneOf(...expectedValues);
   expect(mapper(jsonValue)).toBe(jsonValue);
});

test('expectOneOf throws', () => {
   expect(() => expectOneOf(null)(false)).toThrowJsonMappingError('one of null expected in jsonValue');
   expect(() => expectOneOf(null)(0)).toThrowJsonMappingError('one of null expected in jsonValue');
   expect(() => expectOneOf(null)('')).toThrowJsonMappingError('one of null expected in jsonValue');
   expect(() => expectOneOf(null)([])).toThrowJsonMappingError('one of null expected in jsonValue');
   expect(() => expectOneOf(null)({})).toThrowJsonMappingError('one of null expected in jsonValue');

   expect(() => expectOneOf(false)(null)).toThrowJsonMappingError('one of false expected in jsonValue');
   expect(() => expectOneOf(false)(0)).toThrowJsonMappingError('one of false expected in jsonValue');
   expect(() => expectOneOf(false)('')).toThrowJsonMappingError('one of false expected in jsonValue');
   expect(() => expectOneOf(false)([])).toThrowJsonMappingError('one of false expected in jsonValue');
   expect(() => expectOneOf(false)({})).toThrowJsonMappingError('one of false expected in jsonValue');

   expect(() => expectOneOf(0)(null)).toThrowJsonMappingError('one of 0 expected in jsonValue');
   expect(() => expectOneOf(0)(false)).toThrowJsonMappingError('one of 0 expected in jsonValue');
   expect(() => expectOneOf(0)('')).toThrowJsonMappingError('one of 0 expected in jsonValue');
   expect(() => expectOneOf(0)([])).toThrowJsonMappingError('one of 0 expected in jsonValue');
   expect(() => expectOneOf(0)({})).toThrowJsonMappingError('one of 0 expected in jsonValue');

   expect(() => expectOneOf('')(null)).toThrowJsonMappingError('one of "" expected in jsonValue');
   expect(() => expectOneOf('')(false)).toThrowJsonMappingError('one of "" expected in jsonValue');
   expect(() => expectOneOf('')(0)).toThrowJsonMappingError('one of "" expected in jsonValue');
   expect(() => expectOneOf('')([])).toThrowJsonMappingError('one of "" expected in jsonValue');
   expect(() => expectOneOf('')({})).toThrowJsonMappingError('one of "" expected in jsonValue');

   expect(() => expectOneOf<true | 1 | 'a'>(true, 1, 'a')(false)).toThrowJsonMappingError('one of true, 1, "a" expected in jsonValue');
   expect(() => expectOneOf<true | 1 | 'a'>(true, 1, 'a')(0)).toThrowJsonMappingError('one of true, 1, "a" expected in jsonValue');
   expect(() => expectOneOf<true | 1 | 'a'>(true, 1, 'a')('b')).toThrowJsonMappingError('one of true, 1, "a" expected in jsonValue');
});
