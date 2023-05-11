import { expect, test } from '@jest/globals';

import '../toThrowJsonMappingError';
import { toDate } from './toDate';


test('toDate', () => {
   expect(toDate('2017-09-20T21:00:29.462Z')).toBeInstanceOf(Date);
   expect(toDate('2017-09-20T21:00:29.462Z').getTime()).toBe(new Date('2017-09-20T21:00:29.462Z').getTime());
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
   [{}],
   [{ a: 1, b: 2 }],
   ['2000-01-01T00:00:00'], // missing time zone indicator 'Z'
   ['2000-01-01T00:00:00.000'], // missing time zone indicator 'Z'
])('toDate throws %p (%#)', jsonValue => {
   expect(() => toDate(jsonValue)).toThrowJsonMappingError('combined date and time in ISO 8601 format expected in jsonValue');
});
