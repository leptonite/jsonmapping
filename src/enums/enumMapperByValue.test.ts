import { expect, test } from '@jest/globals';

import '../toThrowJsonMappingError';
import { enumMapperByValue } from './enumMapperByValue';


enum NumberEnum {
   Foo = 2,
   Bar = 3,
}

const numberEnumMapper = enumMapperByValue<NumberEnum>(NumberEnum);


enum StringEnum {
   Foo = 'foo',
   Bar = 'bar',
}

const stringEnumMapper = enumMapperByValue<StringEnum>(StringEnum);


enum MixedEnum {
   Foo = 2,
   Bar = 'bar', // eslint-disable-line @typescript-eslint/no-mixed-enums
}

const mixedEnumMapper = enumMapperByValue<MixedEnum>(MixedEnum);


test('enumMapperByValue with NumberEnum', () => {
   expect(numberEnumMapper(2)).toBe(NumberEnum.Foo);
   expect(numberEnumMapper(3)).toBe(NumberEnum.Bar);
   expect(() => numberEnumMapper('Foo')).toThrowJsonMappingError('enum value expected in jsonValue');
   expect(() => numberEnumMapper('Bar')).toThrowJsonMappingError('enum value expected in jsonValue');
   expect(() => numberEnumMapper('2')).toThrowJsonMappingError('enum value expected in jsonValue');
});

test('enumMapperByValue with StringEnum', () => {
   expect(stringEnumMapper('foo')).toBe(StringEnum.Foo);
   expect(stringEnumMapper('bar')).toBe(StringEnum.Bar);
   expect(() => stringEnumMapper('Foo')).toThrowJsonMappingError('enum value expected in jsonValue');
   expect(() => stringEnumMapper('Bar')).toThrowJsonMappingError('enum value expected in jsonValue');
});

test('enumMapperByValue with MixedEnum', () => {
   expect(mixedEnumMapper(2)).toBe(MixedEnum.Foo);
   expect(mixedEnumMapper('bar')).toBe(MixedEnum.Bar);
   expect(() => mixedEnumMapper('Foo')).toThrowJsonMappingError('enum value expected in jsonValue');
   expect(() => mixedEnumMapper('Bar')).toThrowJsonMappingError('enum value expected in jsonValue');
   expect(() => mixedEnumMapper('2')).toThrowJsonMappingError('enum value expected in jsonValue');
});
