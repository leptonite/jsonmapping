import { expect, test } from '@jest/globals';

import '../toThrowJsonMappingError';
import { enumNumberValueSet } from './enumNumberValueSet';


enum NumberEnum {
   Foo = 2,
   Bar = 3,
}

test('enumNumberValueSet with NumberEnum', () => {
   expect(enumNumberValueSet(NumberEnum)).toStrictEqual(new Set(['2', '3']));
});


enum StringEnum {
   Foo = 'foo',
   Bar = 'bar',
}

test('enumMapperByValue with StringEnum', () => {
   expect(enumNumberValueSet(StringEnum)).toStrictEqual(new Set());
});


enum MixedEnum {
   Foo = 2,
   Bar = 'bar', // eslint-disable-line @typescript-eslint/no-mixed-enums
}

test('enumMapperByValue with MixedEnum', () => {
   expect(enumNumberValueSet(MixedEnum)).toStrictEqual(new Set(['2']));
});


class C {
   [key: string]: string | number;
   public prop = 42;
}
C.prototype['nine'] = 9;
const notAnEnum = new C();

test('enumMapperByValue throws with prototype props', () => {
   expect(() => enumNumberValueSet(notAnEnum)).toThrowError('argument is not a typescript enum because it has a prototype with enumerable properties');
});


enum NotAnEnum {
   Foo = 2,
   Bar = 'bar', // eslint-disable-line @typescript-eslint/no-mixed-enums
}
(NotAnEnum as unknown as Record<string, boolean>)['yes'] = true;

test('enumMapperByValue throws with object containing boolean props', () => {
   expect(() => enumNumberValueSet(NotAnEnum)).toThrowError('argument is not a typescript enum because it has a property which is not of type number and not of type string');
});
