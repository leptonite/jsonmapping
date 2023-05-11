import { expect, test } from '@jest/globals';

import '../toThrowJsonMappingError';
import { expectNumber } from '../scalars/expectNumber';
import { expectString } from '../scalars/expectString';
import { mapObjectMapper } from './mapObjectMapper';


test.each([
   [{}, {}],
   [{ a: '', b: 'b', c: 'c++' }, { a: 0, b: 1, c: 3 }],
])('mapObjectMapper %p (%#)', (jsonValue, expected) => {
   const mapper = mapObjectMapper(jv => {
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
   ['text'],
   [[]],
   [[1, 2, 3]],
])('mapObjectMapper throws on non-object %p (%#)', jsonValue => {
   const mapper = mapObjectMapper(jv => jv);
   expect(() => mapper(jsonValue)).toThrowJsonMappingError('object expected in jsonValue');
});

test('mapObjectMapper throws on invalid elements', () => {
   const mapper = mapObjectMapper(expectNumber);
   const jsonValue = { a: 1, b: 2, c: 'three' };
   expect(() => mapper(jsonValue)).toThrowJsonMappingError('number expected in jsonValue.c');
});
