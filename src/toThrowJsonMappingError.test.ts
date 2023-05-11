import { expect, test } from '@jest/globals';

import { JsonMappingError } from './JsonMappingError';
import './toThrowJsonMappingError';


test('toThrowJsonMappingError with string message', () => {
   expect(() => {
      const throwError = (): never => {
         throw new JsonMappingError('test');
      };
      expect(throwError).toThrowJsonMappingError('test in jsonValue');
   }).not.toThrow();
});

test('toThrowJsonMappingError with message pattern', () => {
   expect(() => {
      const throwError = (): never => {
         throw new JsonMappingError('test');
      };
      expect(throwError).toThrowJsonMappingError(/^test in jsonValue$/u);
   }).not.toThrow();
});

test('toThrowJsonMappingError with non-function', () => {
   expect(() => {
      expect(1).toThrowJsonMappingError('');
   }).toThrowError('matcher toThrowJsonMappingError only works with functions');
});

test('toThrowJsonMappingError with function that does not throw', () => {
   expect(() => {
      expect(() => 1).toThrowJsonMappingError('test');
   }).toThrowError('expected given function to throw a JsonMappingError with message "test" but it did not throw at all');
});

test('toThrowJsonMappingError with function that throws Error', () => {
   expect(() => {
      const throwError = (): never => {
         throw new Error();
      };
      expect(throwError).toThrowJsonMappingError('test');
   }).toThrowError('expected given function to throw a JsonMappingError with message "test" but it threw something that is not a JsonMappingError');
});

test('toThrowJsonMappingError with function that throws JsonMappingError with unexpected message', () => {
   expect(() => {
      const throwError = (): never => {
         throw new JsonMappingError('TEST');
      };
      expect(throwError).toThrowJsonMappingError('test');
   }).toThrowError('expected given function to throw a JsonMappingError with message "test" but the actual message was "TEST in jsonValue"');
});

test('toThrowJsonMappingError with message pattern and function that throws JsonMappingError with unexpected message', () => {
   expect(() => {
      const throwError = (): never => {
         throw new JsonMappingError('TEST');
      };
      expect(throwError).toThrowJsonMappingError(/test/u);
   }).toThrowError('expected given function to throw a JsonMappingError with message that matches /test/u but the actual message was "TEST in jsonValue"');
});

test('not.toThrowJsonMappingError with function that throws JsonMappingError', () => {
   expect(() => {
      const throwError = (): never => {
         throw new JsonMappingError('test');
      };
      expect(throwError).not.toThrowJsonMappingError('test in jsonValue');
   }).toThrowError('expected given function not to throw a JsonMappingError with message "test in jsonValue" but it did exactly that');
});

test('not.toThrowJsonMappingError with message pattern and function that throws JsonMappingError', () => {
   expect(() => {
      const throwError = (): never => {
         throw new JsonMappingError('test');
      };
      expect(throwError).not.toThrowJsonMappingError(/^test in jsonValue$/u);
   }).toThrowError('expected given function not to throw a JsonMappingError with message that matches /^test in jsonValue$/u but it did exactly that');
});
