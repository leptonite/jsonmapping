import { expect, test } from '@jest/globals';

import { expectString } from '../scalars/expectString';
import '../toThrowJsonMappingError';
import { strictObjectMapper } from './strictObjectMapper';


const personMapper = strictObjectMapper(accessor => {
   accessor.ignore('software');
   return {
      firstName: accessor.get('firstName', expectString),
      middleName: accessor.getOptional('middleName', expectString),
      lastName: accessor.get('lastName', expectString),
      book: accessor.getOptional('book', expectString, 'unknown'),
   };
});

test('strictObjectMapper without optional properties', () => {
   const jsonValue = {
      firstName: 'Albert',
      lastName: 'Einstein',
   };
   const expected = {
      firstName: 'Albert',
      middleName: undefined,
      lastName: 'Einstein',
      book: 'unknown',
   };
   expect(personMapper(jsonValue)).toStrictEqual(expected);

});

test('strictObjectMapper with optional properties', () => {

   const jsonValue = {
      firstName: 'Donald',
      middleName: 'Ervin',
      lastName: 'Knuth',
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
])('strictObjectMapper throws on non-object %p (%#)', jsonValue => {
   const mapper = strictObjectMapper(jv => jv);
   expect(() => mapper(jsonValue)).toThrowJsonMappingError('object expected in jsonValue');
});

test('strictObjectMapper throws on missing property', () => {
   expect(() => personMapper({ lastName: 'Einstein' })).toThrowJsonMappingError('missing property "firstName" in jsonValue');
});

test('strictObjectMapper throws on unexpected property', () => {
   expect(() => personMapper({ firstName: 'Albert', lastName: 'Einstein', dob: '1879-03-14' })).toThrowJsonMappingError('unexpected property "dob" in jsonValue');
});
