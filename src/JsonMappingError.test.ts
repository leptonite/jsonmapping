import { expect, test } from '@jest/globals';

import { JsonMappingError, jsonMappingError } from './JsonMappingError';
import './toThrowJsonMappingError';


test('JsonMappingError', () => {
   const e = new JsonMappingError('something went wrong');
   expect(e.message).toBe('something went wrong in jsonValue');
   expect(e.toString()).toBe('JsonMappingError: something went wrong in jsonValue');
   expect(e.toString('this')).toBe('JsonMappingError: something went wrong in this');
});

test('JsonMappingError in identifier property', () => {
   const e = new JsonMappingError('something went wrong');
   const e2 = new JsonMappingError(e, 'foo');
   expect(e2.message).toBe('something went wrong in jsonValue.foo');
   expect(e2.toString()).toBe('JsonMappingError: something went wrong in jsonValue.foo');
   expect(e2.toString('this')).toBe('JsonMappingError: something went wrong in this.foo');
});

test('JsonMappingError in number property', () => {
   const e = new JsonMappingError('something went wrong');
   const e2 = new JsonMappingError(e, 2);
   expect(e2.message).toBe('something went wrong in jsonValue[2]');
   expect(e2.toString()).toBe('JsonMappingError: something went wrong in jsonValue[2]');
   expect(e2.toString('this')).toBe('JsonMappingError: something went wrong in this[2]');
});

test('JsonMappingError in non-identifier string property', () => {
   const e = new JsonMappingError('something went wrong');
   const e2 = new JsonMappingError(e, '@type');
   expect(e2.message).toBe('something went wrong in jsonValue["@type"]');
   expect(e2.toString()).toBe('JsonMappingError: something went wrong in jsonValue["@type"]');
   expect(e2.toString('this')).toBe('JsonMappingError: something went wrong in this["@type"]');
});

test('JsonMappingError with arbitrary nested Error', () => {
   const e = new Error('something went wrong');
   const e2 = new JsonMappingError(e, 'foo');
   expect(e2.message).toBe('Error: something went wrong in jsonValue.foo');
   expect(e2.toString()).toBe('JsonMappingError: Error: something went wrong in jsonValue.foo');
   expect(e2.toString('this')).toBe('JsonMappingError: Error: something went wrong in this.foo');
});

test('jsonMappingError', () => {
   expect(() => jsonMappingError('something went wrong')).toThrowJsonMappingError('something went wrong in jsonValue');
});
