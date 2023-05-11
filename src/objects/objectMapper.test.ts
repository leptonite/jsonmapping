import { expect, test } from '@jest/globals';

import '../toThrowJsonMappingError';
import { expectString } from '../scalars/expectString';
import { objectMapper } from './objectMapper';


const personMapper = objectMapper(accessor => {
   accessor.ignore('software');
   return {
      firstName: accessor.get('firstName', expectString),
      middleName: accessor.getOptional('middleName', expectString),
      lastName: accessor.get('lastName', expectString),
      book: accessor.getOptional('book', expectString, 'unknown'),
   };
});

test('objectMapper without optional properties', () => {
   const jsonValue = {
      firstName: 'Albert',
      lastName: 'Einstein',
      dob: '1879-03-14',
   };
   const expected = {
      firstName: 'Albert',
      middleName: undefined,
      lastName: 'Einstein',
      book: 'unknown',
   };
   expect(personMapper(jsonValue)).toStrictEqual(expected);
});

test('objectMapper with optional properties', () => {
   const jsonValue = {
      firstName: 'Donald',
      middleName: 'Ervin',
      lastName: 'Knuth',
      dob: '1938-01-10',
      book: 'TAOCP',
      software: 'TeX, ...',
   };
   const expected = {
      firstName: 'Donald',
      middleName: 'Ervin',
      lastName: 'Knuth',
      book: 'TAOCP',
   };
   expect(personMapper(jsonValue)).toStrictEqual(expected);
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
])('objectMapper throws on non-object %p (%#)', jsonValue => {
   const mapper = objectMapper(jv => jv);
   expect(() => mapper(jsonValue)).toThrowJsonMappingError('object expected in jsonValue');
});

test('objectMapper throws on missing property', () => {
   expect(() => personMapper({ lastName: 'Einstein' })).toThrowJsonMappingError('missing property "firstName" in jsonValue');
});
