import { expect, test } from '@jest/globals';

import '../toThrowJsonMappingError';
import { enumMapperByIdentifier } from './enumMapperByIdentifier';


enum NumberEnum {
   Foo = 2,
   Bar = 3,
}

const numberEnumMapper = enumMapperByIdentifier<NumberEnum>(NumberEnum);


enum StringEnum {
   Foo = 'foo',
   Bar = 'bar',
}

const stringEnumMapper = enumMapperByIdentifier<StringEnum>(StringEnum);


enum MixedEnum {
   Foo = 2,
   Bar = 'bar', // eslint-disable-line @typescript-eslint/no-mixed-enums
}

const mixedEnumMapper = enumMapperByIdentifier<MixedEnum>(MixedEnum);


test('enumMapperByIdentifier with NumberEnum', () => {
   expect(numberEnumMapper('Foo')).toBe(NumberEnum.Foo);
   expect(numberEnumMapper('Bar')).toBe(NumberEnum.Bar);
   expect(() => numberEnumMapper('Baz')).toThrowJsonMappingError('enum identifier expected in jsonValue');
   expect(() => numberEnumMapper(2)).toThrowJsonMappingError('enum identifier expected in jsonValue');
   expect(() => numberEnumMapper('2')).toThrowJsonMappingError('enum identifier expected in jsonValue');
});

test('enumMapperByIdentifier with StringEnum', () => {
   expect(stringEnumMapper('Foo')).toBe(StringEnum.Foo);
   expect(stringEnumMapper('Bar')).toBe(StringEnum.Bar);
   expect(() => stringEnumMapper('Baz')).toThrowJsonMappingError('enum identifier expected in jsonValue');
   expect(() => stringEnumMapper(2)).toThrowJsonMappingError('enum identifier expected in jsonValue');
   expect(() => stringEnumMapper('2')).toThrowJsonMappingError('enum identifier expected in jsonValue');
});

test('enumMapperByIdentifier with MixedEnum', () => {
   expect(mixedEnumMapper('Foo')).toBe(MixedEnum.Foo);
   expect(mixedEnumMapper('Bar')).toBe(MixedEnum.Bar);
   expect(() => mixedEnumMapper('Baz')).toThrowJsonMappingError('enum identifier expected in jsonValue');
   expect(() => mixedEnumMapper(2)).toThrowJsonMappingError('enum identifier expected in jsonValue');
   expect(() => mixedEnumMapper('2')).toThrowJsonMappingError('enum identifier expected in jsonValue');
});
