import { expect, test } from '@jest/globals';

import '../toThrowJsonMappingError';
import { arrayMapper } from './arrayMapper';
import { expectNumber } from '../scalars/expectNumber';
import { expectString } from '../scalars/expectString';


test.each([
   [[], []],
   [['', 'b', 'c++'], [0, 1, 3]],
])('arrayMapper %p (%#)', (jsonValue, expected) => {
   const mapper = arrayMapper(jv => {
      const s = expectString(jv);
      return s.length;
   });
   expect(mapper(jsonValue)).toStrictEqual(expected);
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
])('arrayMapper throws on non-array %p (%#)', jsonValue => {
   const mapper = arrayMapper(jv => jv);
   expect(() => mapper(jsonValue)).toThrowJsonMappingError('array expected in jsonValue');
});

test('arrayMapper throws on invalid elements', () => {
   const mapper = arrayMapper(expectNumber);
   const jsonValue = [0, 1, 2, 'three'];
   expect(() => mapper(jsonValue)).toThrowJsonMappingError('number expected in jsonValue[3]');
});

test('arrayMapper on three dimensions throws on invalid elements', () => {
   const mapper = arrayMapper(arrayMapper(arrayMapper(expectString)));
   const jsonValue = [
      [], // [0]
      [ // [1]
         [],
      ],
      [ // [2]
         ['a', 'b'],
         ['c', 'd'],
      ],
      [ // [3]
         ['a', 'b'], // [3][0]
         ['c', 'd'], // [3][1]
         ['e', 'f', 'g', 'h', 1], // [3][2]
      ],
   ];
   expect(() => mapper(jsonValue)).toThrowJsonMappingError('string expected in jsonValue[3][2][4]');
});
