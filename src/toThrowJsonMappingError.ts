import { expect } from '@jest/globals';
import type { ExpectationResult } from 'expect';

import { JsonMappingError } from './JsonMappingError';


function toThrowJsonMappingError(received: () => unknown, messagePattern: string | RegExp): ExpectationResult {
   if (typeof received !== 'function') {
      throw new Error('matcher toThrowJsonMappingError only works with functions');
   }

   const noError = {};
   let thrown: unknown = noError;
   try {
      received();
   } catch (e) {
      thrown = e;
   }

   const pass = thrown instanceof JsonMappingError && (typeof messagePattern === 'string' ? thrown.message === messagePattern : messagePattern.test(thrown.message));

   return {
      pass,
      message: pass
         ? (): string => `expected given function not to throw a JsonMappingError with message ${typeof messagePattern === 'string' ? JSON.stringify(messagePattern) : `that matches ${messagePattern}`} but it did exactly that`
         : (): string => {
            let msg = `expected given function to throw a JsonMappingError with message ${typeof messagePattern === 'string' ? JSON.stringify(messagePattern) : `that matches ${messagePattern}`} but `;
            if (thrown === noError) {
               msg += 'it did not throw at all';
            } else if (thrown instanceof JsonMappingError) {
               msg += `the actual message was ${JSON.stringify(thrown.message)}`;
            } else {
               msg += 'it threw something that is not a JsonMappingError';
            }
            return msg;
         },
   };
}

expect.extend({ toThrowJsonMappingError });

declare module 'expect' {
   interface Matchers<R> {
      toThrowJsonMappingError: (messagePattern: string | RegExp) => R;
   }
}
